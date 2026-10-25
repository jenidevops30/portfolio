# Threat Model: AWS DevSecOps Pipeline & Monolith

- **Author:** Jeni Patel (DevOps & Production Systems Engineer)
- **Date:** 2026-10-25
- **Framework:** Microsoft STRIDE & OWASP Top 10
- **Scope:** Application Monolith, GitHub Actions CI/CD, Container Runtime, AWS Cloud Infrastructure

---

## 1. System Overview & Trust Boundaries

The system consists of four primary trust boundaries:
1. **Developer Environment (Workstation):** Untrusted code changes, potential for accidental secret exposure in git history.
2. **CI/CD Automation (GitHub Actions Runner):** Shared execution environment, untrusted third-party actions, temporary runner filesystem.
3. **Container Registry (Amazon ECR):** Stores immutable container artifacts.
4. **Cloud Runtime (AWS VPC & ECS Fargate):** Isolated private subnets, security-group-chained ingress, database persistence.

```text
[Developer Workstation]
        │ (git push)
        ▼
[GitHub Actions Runner] ──(OIDC JWT)──► [AWS STS] ──(Temp Token)──► [Amazon ECR & ECS]
        │
   (OWASP ZAP)
        ▼
[Ephemeral Monolith Container]
```

---

## 2. STRIDE Threat Analysis Matrix

| Threat Category | Specific Attack Vector | Target Surface | Mitigations Implemented in Pipeline & Code |
| :--- | :--- | :--- | :--- |
| **S - Spoofing** | Attacker impersonates GitHub Actions runner to push unauthorized image to ECR | AWS ECR & ECS | **AWS OIDC Federation:** No static credentials. IAM trust policy strictly enforces `aud: sts.amazonaws.com` and `sub: repo:jenidevops30/aws-devsecops-pipeline:ref:refs/heads/main`. |
| **S - Spoofing** | User impersonation / session hijacking in monolith app | Web Application | **Authentication:** Cryptographically secure passwords with `bcrypt` (12 rounds); HttpOnly, Secure, SameSite cookies. |
| **T - Tampering** | Compromise of third-party npm dependencies (Supply Chain Attack) | `node_modules` | **Trivy SCA + npm audit:** Package lockfile audited on every PR; CycloneDX SBOM generated; pinned transitive dependencies; automated CVE gate. |
| **T - Tampering** | Image layer tampering or unauthorized tag overwrite in registry | Amazon ECR | **Image Tag Immutability:** ECR configured with `image_tag_mutability = "IMMUTABLE"`. Every build uses unique Git SHA tags (`v3-${{ github.sha }}`). |
| **R - Repudiation** | Unauthorized infrastructure or container changes without audit trails | AWS Account & ECS | **AWS CloudTrail & Git History:** All OIDC role assumptions logged in CloudTrail; signed commits; PR branch protection requiring passing security checks. |
| **I - Information Disclosure** | Accidental commitment of cloud credentials or API secrets | Git Repository | **Gitleaks Pre-commit & PR Gate:** Regular expression and entropy detection blocks commits containing AWS access keys, private keys, or API tokens. |
| **I - Information Disclosure** | Internal stack trace or database schema leaked to end users | REST API / Monolith | **Central Error Middleware:** Sanitizes production error responses; suppresses stack traces and DB column details (`{ "error": "Internal server error" }`). |
| **I - Information Disclosure** | Missing HTTP security headers allowing clickjacking or MIME sniffing | Browser Client | **Helmet Middleware & OWASP ZAP:** Automatic enforcement of CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, HSTS. |
| **D - Denial of Service** | Credential stuffing or request flooding on login endpoints | `/api/v1/auth/login` | **Rate Limiting:** `express-rate-limit` enforces 5 requests/minute per IP on authentication routes; ALB handles Layer 7 connection throttling. |
| **D - Denial of Service** | Resource exhaustion causing noisy-neighbor container crash | ECS Fargate | **Fargate Task Limits:** Hard CPU (0.5 vCPU) and memory limits (1 GB) with automated restart and health-checked target draining. |
| **E - Elevation of Privilege** | Container breakout or host filesystem compromise | Docker / Fargate | **Hardened Non-Root Container:** Dockerfile runs as unprivileged user (`USER appuser:10001`); dropped Linux capabilities; read-only root filesystem compatible. |
| **E - Elevation of Privilege** | Overly permissive AWS IAM policies allowing lateral account takeover | AWS IAM | **Least-Privilege Scoped Roles:** IAM deployment role only has permissions to `ecr:PutImage` on target repo and `ecs:UpdateService` on target cluster. |

---

## 3. Residual Risks & Accepted Mitigations
1. **Zero-Day Vulnerabilities in Node.js Base Image:**
   * *Mitigation:* Daily automated Trivy vulnerability scanning cron and dependabot alerts.
2. **Ephemeral Local DAST Scan Limitations:**
   * *Mitigation:* OWASP ZAP Baseline covers OWASP Top 10 runtime misconfigurations; deep active scans can be triggered on staging environments prior to production promotion.
