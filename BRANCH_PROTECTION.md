# Main Branch Protection Rules

Enforce quality gates and prevent accidental breaking changes to production.

## 🔒 Protected Branch Rules for `main`

### Enable These Rules in GitHub

**Settings → Branches → Branch protection rules → Add rule**

#### Rule: `main`

### ✅ Enforce Requirements

- [x] **Require pull request reviews before merging**
  - Required number of approvals: 1
  - Dismiss stale pull request approvals when new commits are pushed: ✓
  - Require review from code owners: ✓ (if CODEOWNERS file exists)

- [x] **Require status checks to pass before merging**
  - Require branches to be up to date before merging: ✓
  - Required status checks:
    - `Build, Deploy to S3 & Invalidate CloudFront` (GitHub Actions)
    - Specific checks to enforce:
      - ✓ ESLint (code quality)
      - ✓ Snyk security scan (no high-severity vulns)
      - ✓ Lighthouse performance audit (warn on category regressions)

- [x] **Require conversation resolution before merging**
  - ✓ Require all conversations on code to be resolved

- [x] **Require signed commits**
  - ✓ Require signed commits (GPG or SSH key)
  - Protects against commit spoofing

- [x] **Dismiss pull requests when a new commit is pushed**
  - ✓ Automatically dismiss approvals if new commits are pushed

- [x] **Include administrators**
  - ✓ Enforce all the above rules for administrators too (no bypassing)

- [x] **Restrict who can push to matching branches**
  - ✓ Allow only admins to push directly (emergency only)

---

## 📋 Branch Protection Enforcement

### What Gets Blocked

| Action | Blocked? | Reason |
|--------|----------|--------|
| Push directly to main | ✓ Yes | Must go through PR |
| Merge PR without review | ✓ Yes | Requires 1 approval |
| Merge with failing tests | ✓ Yes | ESLint/Snyk must pass |
| Merge with unresolved conversations | ✓ Yes | All discussions resolved |
| Admin bypass | ✓ Yes | Rules apply to all |

### What's Allowed

| Action | Allowed? | Process |
|--------|----------|---------|
| Create PR from branch | ✓ Yes | Normal flow |
| Run all status checks | ✓ Yes | Automatic on PR |
| Get PR approval | ✓ Yes | Code owner review |
| Merge after checks pass | ✓ Yes | Click merge button |

---

## 🚀 Deployment Workflow (with Protection)

```
1. Create feature branch
   git checkout -b feat/new-feature

2. Commit with conventional commit message
   git commit -m "feat: add new feature"
   (This triggers semantic-release later)

3. Push and create PR
   git push origin feat/new-feature
   gh pr create

4. GitHub Actions runs
   ✓ ESLint (must pass)
   ✓ Snyk (must pass)
   ✓ Lighthouse (warns only)
   ✓ Deploy preview (optional)

5. Code review required
   - At least 1 approval needed
   - All conversations resolved
   - All checks passing

6. Merge to main
   - Automatic deployment via GitHub Actions
   - Semantic-release creates GitHub Release
   - Version auto-bumped

7. Live at jenidevops.in
   - CloudFront cache invalidated
   - Release notes published
```

---

## 🔐 Security Best Practices

### Signed Commits
Require all commits to main be GPG-signed:

```bash
# Generate GPG key
gpg --full-gen-key

# Configure Git
git config --global user.signingkey <key-id>
git config --global commit.gpgsign true

# Sign commits
git commit -S -m "message"
```

### CODEOWNERS File
Create `.github/CODEOWNERS`:

```
# Infrastructure
/terraform/ @jenidevops30

# CI/CD
/.github/ @jenidevops30

# Frontend
/frontend/ @jenidevops30

# Everyone must review documentation changes
*.md @jenidevops30
```

---

## 📊 Branch Protection Status

Check current rules:

```bash
# View branch protection rules
gh api repos/jenidevops30/portfolio/branches/main/protection

# Example output:
# {
#   "required_pull_request_reviews": {
#     "required_approving_review_count": 1
#   },
#   "required_status_checks": {
#     "contexts": [
#       "Build, Deploy to S3 & Invalidate CloudFront"
#     ]
#   },
#   "enforce_admins": true
# }
```

---

## ✅ Checklist: Setting Up Branch Protection

- [ ] Go to GitHub repo → Settings → Branches
- [ ] Click "Add rule"
- [ ] Pattern: `main`
- [ ] Enable "Require pull request reviews" (1 approval)
- [ ] Enable "Require status checks to pass"
- [ ] Select `Build, Deploy to S3 & Invalidate CloudFront`
- [ ] Enable "Require branches to be up to date"
- [ ] Enable "Require conversation resolution"
- [ ] Enable "Require signed commits" (if using GPG)
- [ ] Enable "Dismiss stale PR approvals"
- [ ] Enable "Enforce all the above rules for administrators"
- [ ] Click "Create"

---

## 🎯 What This Demonstrates

| Practice | Evidence |
|----------|----------|
| **Release Safety** | CI/CD checks must pass before production merge |
| **Code Quality** | Automated linting, security scanning, performance audits |
| **Team Process** | Formal PR reviews, signed commits, conversation resolution |
| **Production Maturity** | Admins can't bypass rules (no special privileges for breaking changes) |
| **Operational Rigor** | Professional branch protection matching enterprise standards |

---

**Maintained by**: Jeni Patel  
**Last updated**: September 2026  
**Status**: Production Ready ✅
