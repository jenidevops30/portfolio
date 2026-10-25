# Security Runbook & Failure Drill Playbook

- **Project:** Production AWS DevSecOps Pipeline
- **Author:** Jeni Patel (DevOps & Production Systems Engineer)
- **Date:** 2026-10-25
- **Status:** APPROVED

---

## 1. Overview & Purpose

This runbook provides step-by-step diagnostic and remediation instructions when a security gate trips in the CI/CD pipeline, and documents the operational execution of the **5 Deliberate Failure Drills**.

---

## 2. Gate Failure Triage & Remediation Procedures

### Gate 1: Secret Detected by Gitleaks
* **Symptom:** Pull Request check `secret-scan` fails with exit code `1`.
* **Diagnostic Command:**
  ```bash
  gitleaks detect --source . --verbose
  ```
* **Triage Steps:**
  1. Inspect the finding line, file, and commit hash.
  2. If the secret is **real/active**:
     * Immediately revoke/rotate the compromised credential in AWS IAM or the third-party service.
     * Rewrite git history using `git-filter-repo` or BFG to purge the secret from all branches.
     * Do NOT simply commit a deletion of the file — git history retains old commits.
  3. If the secret is a **verified false positive**:
     * Add the file path or regex pattern to `.gitleaks.toml` under `[allowlist]`.

---

### Gate 2: SAST Vulnerability Flagged by Semgrep
* **Symptom:** PR check `sast-and-code-security` fails with High/Error findings.
* **Diagnostic Command:**
  ```bash
  npx semgrep --config "p/owasp-top-ten" ./app
  ```
* **Triage Steps:**
  1. Inspect the rule ID (e.g., `javascript.express.security.audit.sqli.express-sqli`).
  2. Locate the line where untrusted `req.body` or `req.query` is interpolated directly into queries or shell executions.
  3. Refactor to use parameterized database statements or strict `zod` input sanitization.
  4. Run `npm test` to verify functional behavior is preserved.

---

### Gate 3: SCA Dependency CVE Flagged by Trivy / npm audit
* **Symptom:** PR check `sca-dependencies` fails with `CRITICAL` vulnerability alert.
* **Diagnostic Command:**
  ```bash
  trivy fs --severity HIGH,CRITICAL ./app
  # or
  npm --prefix app audit
  ```
* **Triage Steps:**
  1. Identify the package name and vulnerable version range.
  2. Check if a non-breaking patch exists: `npm --prefix app audit fix`.
  3. If breaking changes exist, review release notes and update the dependency in `package.json`.
  4. Verify package lock integrity and re-run Trivy.

---

### Gate 4: IaC Misconfiguration Flagged by Checkov
* **Symptom:** PR check `iac-security` fails with CIS AWS benchmark violation.
* **Diagnostic Command:**
  ```bash
  checkov -d ./terraform
  ```
* **Triage Steps:**
  1. Identify the Checkov rule ID (e.g., `CKV_AWS_24` for open SSH port `22` or `CKV_AWS_260` for open ingress).
  2. Review the resource block in `terraform/security-groups.tf` or `terraform/ecr.tf`.
  3. Tighten security group CIDRs or enable encryption at rest.

---

### Gate 5: Dynamic Runtime Flaw Flagged by OWASP ZAP (DAST)
* **Symptom:** Main branch deploy job `dast-scan` fails with runtime security alert.
* **Diagnostic Command:**
  ```bash
  docker run -d -p 3000:3000 --name app-test aws-devsecops-pipeline:local
  docker run -t --network="host" zaproxy/zap-baseline.py -t http://localhost:3000
  ```
* **Triage Steps:**
  1. Download the generated `zap-report.html` from GitHub Actions artifacts.
  2. Common alerts: Missing Anti-CSRF token, Missing CSP header, or Cookie without `HttpOnly` / `SameSite`.
  3. Update `app/src/middleware/security.js` with the required Helmet header options or cookie flags.

---

## 3. Deliberate Failure Testing Drills Suite

To prove to auditors, recruiters, and engineering teams that these security gates actively prevent compromised code from reaching production, run the drill suite:

### Drill 1: Secret Leak Prevention
```bash
./scripts/drills/drill-01-secret-leak.sh
```
* **Action:** Injects a mock AWS secret key into a dummy branch and invokes Gitleaks.
* **Verification:** Gitleaks exits with code `1`, blocks the simulated commit, and cleans up the temporary branch.

### Drill 2: SQL Injection SAST Prevention
```bash
./scripts/drills/drill-02-sast-sqli.sh
```
* **Action:** Injects raw SQL concatenation into `app/src/routes/orders.js`.
* **Verification:** Semgrep identifies CWE-89, flags line number, and fails the build.

### Drill 3: Vulnerable Package SCA Prevention
```bash
./scripts/drills/drill-03-vulnerable-dep.sh
```
* **Action:** Adds a legacy package containing a known RCE (e.g., outdated `lodash` or `serialize-javascript`).
* **Verification:** Trivy outputs CVE advisory and terminates with exit code `1`.

### Drill 4: Open Security Group IaC Prevention
```bash
./scripts/drills/drill-04-iac-open-sg.sh
```
* **Action:** Edits `terraform/security-groups.tf` to open port `22` to `0.0.0.0/0`.
* **Verification:** Checkov fails with `CKV_AWS_24` violation.

### Drill 5: Missing Security Header DAST Prevention
```bash
./scripts/drills/drill-05-dast-missing-headers.sh
```
* **Action:** Disables Helmet middleware in `app/src/app.js` and runs OWASP ZAP.
* **Verification:** ZAP flags missing Content Security Policy and anti-clickjacking headers.
