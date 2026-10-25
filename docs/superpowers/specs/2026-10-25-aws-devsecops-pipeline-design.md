# System Design & Architecture: Production AWS DevSecOps Pipeline

- **Author:** Jeni Patel (DevOps & Production Systems Engineer)
- **Date:** 2026-10-25
- **Status:** APPROVED (Ready for Implementation Planning)
- **Target Repository:** `/home/jeni/Storage/Dev/projects/aws-devsecops-pipeline`
- **Portfolio Case Study Route:** `/projects/cicd-pipeline`

---

## 1. Executive Summary & Objective

Modern cloud engineering requires that security, reliability, and automated delivery be embedded from the first commit rather than bolted on after deployment.

The **Production AWS DevSecOps Pipeline** is a reference architecture that demonstrates how to automate continuous integration, comprehensive static and dynamic security scanning, infrastructure verification, and passwordless AWS container deployments. 

The pipeline protects a **full-stack Node.js Express monolith** (Order & Inventory Management System) and deploys it to a resilient, auto-scaling **Amazon ECS on AWS Fargate** environment fronted by an Application Load Balancer.

---

## 2. Complete DevSecOps Security Spectrum (6-Layer Matrix)

Every commit, pull request, and release artifact is subjected to automated, non-bypassable security quality gates:

```mermaid
flowchart TD
    subgraph Shift_Left["1. Pull Request Gates (Shift-Left Pre-Merge)"]
        A[Developer Commit & PR] --> B[Layer 1: Gitleaks\nSecret Scanning]
        A --> C[Layer 2: Semgrep & ESLint\nSAST & AppSec Code Linting]
        A --> D[Layer 3: Trivy fs & npm audit\nSCA & Supply Chain Security]
        A --> E[Layer 4: Checkov\nIaC Posture & CIS AWS Rules]
        A --> F[Automated Tests\nJest Unit & Route Integration]
        B & C & D & E & F --> G{PR Security Gate}
        G -- Any High/Critical Failure --> H[❌ PR Blocked & SARIF Annotated]
        G -- Clean --> I[✅ PR Approved to Merge]
    end

    subgraph Build_DAST["2. Build & Dynamic Verification Gate"]
        I --> J[Multi-Stage Hardened Docker Build]
        J --> K[Layer 5: Trivy Image Scan\nContainer CVEs & Misconfigs]
        K --> L[Ephemeral Container Startup\nWait for /health HTTP 200]
        L --> M[Layer 6: OWASP ZAP DAST\nActive Endpoint & Header Scan]
        M --> N{Container & DAST Clean?}
        N -- Failed --> O[❌ Build Blocked & ZAP HTML Exported]
        N -- Passed --> P[✅ Release Candidate Ready]
    end

    subgraph Cloud_Deploy["3. Passwordless AWS Deployment"]
        P --> Q[AWS OIDC Federation\nAssumeRole with GitHub JWT]
        Q --> R[Push Image to Amazon ECR\nImmutable Tags & KMS Encrypted]
        R --> S[Amazon ECS Fargate Rolling Deployment]
        S --> T[Automated Smoke Tests & Health Check]
        T --> U[✅ Production Release Verified]
    end
```

### Detailed Security Gates & Tools

| Layer | Domain | Tooling | Target Surface | Gate Enforcement Policy |
| :--- | :--- | :--- | :--- | :--- |
| **1. Secrets** | Hardcoded Credentials | **Gitleaks** | Git commit diffs, config files, git history | **Zero tolerance:** Build fails on any leaked AWS key, private key, or API secret |
| **2. SAST** | Code Security & Injection | **Semgrep** (OWASP Top 10) + `eslint-plugin-security` | JavaScript AST, route handlers, DB queries | **Block on HIGH/ERROR:** Catches SQLi (CWE-89), XSS (CWE-79), path traversal (CWE-22) |
| **3. SCA** | Supply Chain / Packages | **Trivy fs** + `npm audit` | `package-lock.json` dependency tree | **Block on CRITICAL CVEs:** Exports CycloneDX SBOM (`sbom.json`) |
| **4. IaC** | Cloud Infrastructure Posture | **Checkov** | Terraform `.tf` source files | **Block on CIS AWS Benchmark failures** (open SGs, unencrypted storage) |
| **5. Container** | Base OS & Image CVEs | **Trivy image** | Docker image layers | **Block on CRITICAL/HIGH CVEs:** Enforces non-root user and minimal image |
| **6. DAST** | Dynamic Runtime Penetration | **OWASP ZAP** | Live running container on `localhost:3000` | **Block on HIGH runtime findings:** Validates HTTP headers, cookies, injection |

---

## 3. System Architecture & Components

### 3.1 The Monolith Application Stack
* **Language & Runtime:** Node.js 20 LTS.
* **Framework:** Express.js with modular routing, central error handling, and structured JSON logging.
* **Database Layer:** PostgreSQL / SQLite with connection pooling, migrations, and parameterized query models (Users, Orders, Inventory).
* **In-Code Security Defenses:**
  * **Input Validation:** Strict `zod` schema validation on all incoming request bodies and query parameters.
  * **HTTP Security Headers:** `helmet` configured with strict Content Security Policy (CSP), HSTS, and `X-Frame-Options: DENY`.
  * **Rate Limiting:** `express-rate-limit` protecting `/api/v1/auth/*` against credential stuffing.
  * **Authentication:** `bcrypt` password hashing (salt rounds 12) + HttpOnly, Secure, SameSite cookies.
  * **Observability Endpoints:**
    * `GET /health`: Liveness probe (HTTP 200).
    * `GET /ready`: Readiness probe (validates database connection pool and schema state).
    * `GET /metrics`: Process telemetry (memory heap, event loop lag, process uptime).

### 3.2 Container Hardening Architecture
```dockerfile
# Builder Stage: Install all dependencies & build assets
FROM node:20-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .

# Production Runner Stage: Minimal runtime, zero devDependencies, non-root user
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 10001 -S appgroup && adduser -u 10001 -S appuser -G appgroup
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY --from=builder --chown=appuser:appgroup /build/src ./src
COPY --from=builder --chown=appuser:appgroup /build/views ./views
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "src/server.js"]
```

### 3.3 AWS Cloud Infrastructure (Terraform)
* **VPC:** Multi-AZ network across 2 Availability Zones (`us-east-1a`, `us-east-1b`) with public application subnets and isolated private subnets.
* **Security Group Chaining:**
  * ALB SG: Accepts public HTTPS TCP/443 and HTTP TCP/80.
  * ECS Fargate SG: Accepts ingress TCP/3000 **strictly** from the ALB Security Group ID.
  * Database SG: Accepts ingress TCP/5432 **strictly** from the ECS Fargate Security Group ID.
* **Amazon ECR:** Encrypted repository with image tag immutability enabled and scan-on-push enabled.
* **Amazon ECS Fargate:**
  * Task Definition with memory/CPU limits (0.5 vCPU, 1 GB RAM).
  * Rolling deployment configuration (`minimumHealthyPercent: 100`, `maximumPercent: 200`).
* **AWS OIDC Provider:** Configured for `token.actions.githubusercontent.com` with scoped thumbprints and IAM trust policies.

---

## 4. GitHub Actions CI/CD Architecture

### Workflow 1: Pull Request Shift-Left Security (`devsecops-pr.yml`)
* **Triggers:** Pull requests targeting `main`.
* **Jobs (Concurrently executed):**
  1. `secret-scan`: Runs `gitleaks/gitleaks-action` with `.gitleaks.toml`.
  2. `sast-and-code-security`: Runs Semgrep (OWASP rules) + ESLint security plugin; uploads `semgrep.sarif`.
  3. `sca-dependencies`: Runs `trivy fs` on `package-lock.json`; generates SBOM and SARIF report.
  4. `iac-security`: Runs `checkov` against `terraform/` directory.
  5. `unit-tests`: Executes `npm test` with Jest code coverage reports.

### Workflow 2: Main Release & Deployment (`devsecops-deploy.yml`)
* **Triggers:** Push to `main` branch.
* **Jobs:**
  1. `build-and-container-scan`:
     * Builds Docker image with Git SHA tag (`v3-${{ github.sha }}`).
     * Runs `trivy image` against the built container (fails if CRITICAL CVEs exist).
  2. `dast-dynamic-verification`:
     * Spins up container locally in runner.
     * Executes OWASP ZAP Baseline/API scan.
     * Uploads `zap-report.html` as build artifact.
  3. `deploy-to-aws-ecs`:
     * Assumes IAM Role via `aws-actions/configure-aws-credentials` using OIDC token.
     * Logs into Amazon ECR, pushes tagged Docker image.
     * Updates ECS Task Definition and initiates ECS service update.
     * Waits for ECS service stability.
  4. `post-deploy-verification`:
     * Runs `scripts/verify-deployment.sh` against ALB public DNS.
     * Asserts `/health` and `/ready` return HTTP 200.

---

## 5. Deliberate Failure Testing Drills Suite

To validate and demonstrate the integrity of the security gates (aligning with Jeni's evidence-based engineering methodology), the repository includes automated drill scripts:

| Drill ID | Script Name | Targeted Security Gate | Test Injection | Expected Pipeline Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **DRILL-01** | `drill-secret-leak.sh` | Gate 1 (Gitleaks) | Adds mock AWS key `AKIAIOSFODNN7EXAMPLE` | Pipeline fails at secret scan step; zero code built or deployed. |
| **DRILL-02** | `drill-sast-sqli.sh` | Gate 2 (Semgrep) | Concatenates unescaped user input into raw SQL | Semgrep flags CWE-89 SQLi; produces SARIF annotation on line. |
| **DRILL-03** | `drill-vulnerable-package.sh` | Gate 3 (Trivy SCA) | Installs older package with known remote code execution CVE | Trivy blocks build with CVE reference and required patch version. |
| **DRILL-04** | `drill-iac-open-sg.sh` | Gate 4 (Checkov) | Sets security group ingress rule to `0.0.0.0/0` on port 22 | Checkov flags CKV_AWS_24; blocks IaC validation. |
| **DRILL-05** | `drill-dast-missing-headers.sh` | Gate 6 (OWASP ZAP) | Temporarily disables CSP and anti-clickjacking headers | OWASP ZAP detects missing headers; pipeline fails during dynamic scan. |

---

## 6. Project Directory Layout

```text
/home/jeni/Storage/Dev/projects/aws-devsecops-pipeline/
├── .github/
│   └── workflows/
│       ├── devsecops-pr.yml
│       └── devsecops-deploy.yml
├── app/
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── security.js
│   │   │   └── validate.js
│   │   ├── routes/
│   │   │   ├── health.js
│   │   │   ├── auth.js
│   │   │   └── orders.js
│   │   └── views/
│   │       ├── dashboard.ejs
│   │       └── layout.ejs
│   ├── db/
│   │   └── schema.sql
│   ├── tests/
│   │   ├── security.test.js
│   │   └── routes.test.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── terraform/
│   ├── main.tf
│   ├── oidc.tf
│   ├── ecr.tf
│   ├── ecs.tf
│   ├── vpc.tf
│   ├── security-groups.tf
│   ├── variables.tf
│   └── outputs.tf
├── security/
│   ├── .gitleaks.toml
│   ├── .checkov.yml
│   └── zap-rules.tsv
├── scripts/
│   ├── verify-deployment.sh
│   └── drills/
│       ├── drill-secret-leak.sh
│       ├── drill-sast-sqli.sh
│       ├── drill-vulnerable-package.sh
│       ├── drill-iac-open-sg.sh
│       └── drill-dast-missing-headers.sh
├── Makefile
├── LICENSE
└── README.md
```

---

## 7. Portfolio Integration (`v3`)

Once the pipeline project is verified, we will update the portfolio:
1. Promote Project 03 in [app/views/case-study/projects.ejs](file:///home/jeni/Storage/Dev/portfolio/jenidevops-portfolio/v3/app/views/case-study/projects.ejs) from `PLANNED` to `COMPLETED / VERIFIED`.
2. Update [app/public/index.html](file:///home/jeni/Storage/Dev/portfolio/jenidevops-portfolio/v3/app/public/index.html) to link directly to `/projects/cicd-pipeline`.
3. Create the comprehensive case study template [app/views/case-study/cicd-pipeline.ejs](file:///home/jeni/Storage/Dev/portfolio/jenidevops-portfolio/v3/app/views/case-study/cicd-pipeline.ejs) documenting the 6 security gates, OIDC architecture, and failure testing evidence.
