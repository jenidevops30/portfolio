# AWS DevSecOps Pipeline & Monolith Implementation Plan

- **Author:** Jeni Patel (DevOps & Production Systems Engineer)
- **Date:** 2026-10-25
- **Status:** READY
- **Target Repository:** `/home/jeni/Storage/Dev/projects/aws-devsecops-pipeline`
- **Spec Reference:** [2026-10-25-aws-devsecops-pipeline-design.md](file:///home/jeni/Storage/Dev/portfolio/jenidevops-portfolio/v3/docs/superpowers/specs/2026-10-25-aws-devsecops-pipeline-design.md)

---

## Proposed Changes & File Manifest

### Target Project Repository: `/home/jeni/Storage/Dev/projects/aws-devsecops-pipeline`

#### 1. Core Scaffolding & Monolith Application
- `app/package.json`: Node.js 20 LTS dependencies (`express`, `helmet`, `zod`, `bcryptjs`, `better-sqlite3`, `dotenv`, `express-rate-limit`, `morgan`). DevDependencies (`jest`, `supertest`, `eslint`, `eslint-plugin-security`, `semgrep`).
- `app/src/server.js`: Server lifecycle, graceful shutdown handlers (`SIGTERM`, `SIGINT`), environment config.
- `app/src/app.js`: Express configuration, security middlewares (`helmet`, rate limiters, CSP, JSON parsers).
- `app/src/config/database.js`: SQLite/PostgreSQL connection pool with automatic initialization.
- `app/src/routes/health.js`: `/health` (liveness), `/ready` (readiness with DB check), `/metrics` (heap/uptime).
- `app/src/routes/auth.js`: User login, password hashing (`bcrypt`), JWT/cookie sessions.
- `app/src/routes/orders.js`: Order CRUD routes with strict `zod` validation and parameterized SQL.
- `app/src/middleware/security.js`: Custom AppSec middleware (sanitize input, strip debug headers).
- `app/src/middleware/errorHandler.js`: Central error handler preventing stack trace leakages in production.
- `app/tests/security.test.js`: AppSec test suite (verifying SQL injection rejection, XSS defense, rate limiting, and HTTP security headers).
- `app/tests/routes.test.js`: Liveness, readiness, and order API test suite.
- `app/Dockerfile`: Multi-stage hardened build (non-root `appuser:10001`, alpine base, zero devDependencies).
- `app/.dockerignore`: Prevents local `node_modules`, `.git`, `.env` from leaking into image.

#### 2. Infrastructure as Code (Terraform)
- `terraform/main.tf`: AWS provider (v5.x), backend config, tags.
- `terraform/vpc.tf`: Multi-AZ VPC across 2 AZs, public application subnets, isolated database subnets.
- `terraform/oidc.tf`: GitHub Actions OpenID Connect (OIDC) provider and scoped IAM AssumeRole policy.
- `terraform/ecr.tf`: Amazon ECR repository with KMS encryption, scan-on-push, and immutable image tags.
- `terraform/ecs.tf`: ECS Cluster, Fargate Task Definition (CPU/memory budgets, non-root), and ECS Service.
- `terraform/alb.tf`: Application Load Balancer, Target Group with `/health` check, HTTPS/HTTP listener rules.
- `terraform/security-groups.tf`: Chained security groups (Internet → ALB → ECS Fargate → Database).
- `terraform/variables.tf`: Configurable parameters with type and description constraints.
- `terraform/outputs.tf`: ECR URL, ALB DNS, OIDC Role ARN, ECS Cluster name.

#### 3. Security Configurations & Policies
- `security/.gitleaks.toml`: Gitleaks custom ruleset and test exemptions for drill scripts.
- `security/.checkov.yml`: Checkov baseline configuration and framework rules.
- `security/zap-rules.tsv`: OWASP ZAP baseline rules and threshold triggers.
- `.eslintrc.json`: Security lint rules with `eslint-plugin-security`.

#### 4. GitHub Actions Workflows
- `.github/workflows/devsecops-pr.yml`:
  - Job 1: `secret-scan` (Gitleaks)
  - Job 2: `sast-and-lint` (Semgrep OWASP rules + ESLint security)
  - Job 3: `sca-dependencies` (Trivy fs + `npm audit` + CycloneDX SBOM)
  - Job 4: `iac-security` (Checkov Terraform scanner)
  - Job 5: `unit-tests` (Jest + Supertest coverage)
- `.github/workflows/devsecops-deploy.yml`:
  - Job 1: `build-and-container-scan` (Docker multi-stage + Trivy image CVE scan)
  - Job 2: `dast-scan` (Ephemeral container startup + OWASP ZAP dynamic crawl)
  - Job 3: `deploy-aws` (AWS OIDC AssumeRole, ECR push, ECS Fargate service update)
  - Job 4: `post-deploy-verify` (ALB smoke test runner)

#### 5. Drills & Verification Scripts
- `scripts/verify-deployment.sh`: Smoke-test script verifying live endpoints.
- `scripts/drills/drill-01-secret-leak.sh`: Injects mock AWS credential to test Gate 1 failure.
- `scripts/drills/drill-02-sast-sqli.sh`: Injects raw SQL string concatenation to test Gate 2 failure.
- `scripts/drills/drill-03-vulnerable-dep.sh`: Installs package with known CVE to test Gate 3 failure.
- `scripts/drills/drill-04-iac-open-sg.sh`: Opens port 22 to `0.0.0.0/0` in Terraform to test Gate 4 failure.
- `scripts/drills/drill-05-dast-missing-headers.sh`: Disables security headers to test Gate 6 failure.
- `Makefile`: Commands for `make dev`, `make test`, `make security-scan`, `make docker-build`, `make drill`.

---

## Step-by-Step Implementation Tasks

### Task 1: Repository Initialization & Tool Configuration
1. Initialize `/home/jeni/Storage/Dev/projects/aws-devsecops-pipeline`.
2. Initialize git repository and `.gitignore`.
3. Create `Makefile` with targets: `install`, `dev`, `test`, `lint`, `scan-secrets`, `scan-sast`, `scan-sca`, `scan-iac`, `docker-build`, `docker-run`, `scan-dast`.
4. Configure `.eslintrc.json`, `security/.gitleaks.toml`, `security/.checkov.yml`.

### Task 2: Build the Monolith Application with In-Code AppSec
1. Scaffold `app/package.json` with dependencies and scripts.
2. Implement `app/src/config/database.js` (SQLite connection, migrations, seeded catalog).
3. Implement `app/src/middleware/security.js` (Helmet, rate limiting, request validation).
4. Implement `app/src/routes/health.js` (`/health`, `/ready`, `/metrics`).
5. Implement `app/src/routes/auth.js` and `app/src/routes/orders.js`.
6. Implement `app/src/server.js` with graceful shutdown signal handlers.
7. Write unit and security integration tests in `app/tests/`.
8. Verify all tests pass locally: `npm test`.

### Task 3: Container Hardening & Docker Configuration
1. Create `app/Dockerfile` with multi-stage build, unprivileged user, and healthcheck.
2. Build local Docker image: `docker build -t aws-devsecops-pipeline:local ./app`.
3. Verify container runs as non-root user and `/health` returns HTTP 200.

### Task 4: Infrastructure as Code (Terraform & AWS OIDC)
1. Write `terraform/main.tf`, `variables.tf`, `outputs.tf`.
2. Write `terraform/oidc.tf` configuring GitHub OIDC provider and scoped IAM role.
3. Write `terraform/ecr.tf` (immutable tags, scan-on-push, encryption).
4. Write `terraform/vpc.tf`, `security-groups.tf`, `alb.tf`, and `ecs.tf`.
5. Run `terraform fmt -check` and `terraform validate`.

### Task 5: CI/CD Workflows (PR Security Gates & Main Deployment)
1. Implement `.github/workflows/devsecops-pr.yml` with parallel jobs (Gitleaks, Semgrep, Trivy fs, Checkov, Jest).
2. Implement `.github/workflows/devsecops-deploy.yml` with Docker build, Trivy container scan, OWASP ZAP DAST, AWS OIDC deploy, and post-deploy smoke test.

### Task 6: Security Failure Testing Drills Suite
1. Create `scripts/drills/` containing drills 1 through 5.
2. Make scripts executable (`chmod +x scripts/drills/*.sh`).
3. Verify each drill script cleanly injects the vulnerability, demonstrates the tool blocking it, and cleans up after itself.

### Task 7: Comprehensive Documentation & Portfolio Linkage
1. Write project `README.md` with architectural diagrams, CLI examples, security matrices, and runbook instructions.
2. Write `SECURITY-RUNBOOK.md` detailing triage, remediation, and audit logging.
3. Update portfolio case study files in `v3/` to showcase the new DevSecOps project.
