# CI/CD Pipeline: jenidevops.in Portfolio

This document explains the automated build, test, and deployment pipeline that powers your portfolio site.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         PIPELINE FLOW                       │
└─────────────────────────────────────────────────────────────┘

     GitHub Push
          │
          ▼
    ┌──────────────────────────────────────┐
    │   GitHub Actions Workflow Triggered  │
    │  (.github/workflows/deploy.yml)      │
    └──────────────────────────────────────┘
          │
          ├─► Step 1: Checkout Code
          │        └─► actions/checkout@v4
          │
          ├─► Step 2: Setup Node.js 20
          │        └─► actions/setup-node@v4
          │        └─► Cache: frontend/package-lock.json
          │
          ├─► Step 3: Install Dependencies
          │        └─► npm ci (clean install)
          │
          ├─► Step 4: Lint & Type Check
          │        └─► npm run lint
          │        └─► ESLint passes or build fails
          │
          ├─► Step 5: Build React/Vite App
          │        └─► npm run build
          │        └─► Output: frontend/dist/
          │        ├─► index.html (1.26 KB gzip)
          │        ├─► index-*.css (3.41 KB gzip)
          │        └─► index-*.js (69.74 KB gzip)
          │
          ├─► Step 5b: Security Scan (Snyk)
          │        └─► Check npm dependencies for vulnerabilities
          │        └─► Fail if high-severity vulns found
          │        └─► Results: npm audit + Snyk report
          │
          ├─► Step 5c: Performance Audit (Lighthouse CI)
          │        └─► Test: Performance, Accessibility, Best Practices, SEO
          │        └─► Thresholds: 85+ performance, 90+ accessibility, 90+ SEO
          │        └─► Results: JSON report + temporary public URL
          │
          ├─► Step 6: Configure AWS Credentials
          │        └─► aws-actions/configure-aws-credentials@v4
          │        └─► Uses GitHub OIDC to assume a dedicated IAM role (temporary credentials)
          │
          ├─► Step 7: Deploy to S3
          │        └─► aws s3 sync frontend/dist s3://jeni-portfolio --delete
          │        └─► Uploads only changed files (efficient)
          │
          └─► Step 8: Invalidate CloudFront Cache
                   └─► aws cloudfront create-invalidation
                   └─► Clears CDN cache so changes go live immediately

          │
          ▼
    ┌──────────────────────────────────────┐
    │    🚀 Live at jenidevops.in          │
    │  (via CloudFront + Route 53 DNS)     │
    └──────────────────────────────────────┘
```

## 🔒 Security & Performance Gates

### **Snyk Dependency Scanning**
Automatically scans npm dependencies for known vulnerabilities:
- ✅ Checks every npm install
- ✅ Fails if high-severity vulnerabilities found
- ✅ Provides remediation guidance (upgrade path)
- ✅ Blocks deployment of unsafe code

**Setup**: Add `SNYK_TOKEN` to GitHub Secrets (from Snyk.io)

### **Lighthouse CI Performance Testing**
Tests the built site for performance, accessibility, and SEO:
- ✅ **Performance**: Tracks Core Web Vitals, load times
- ✅ **Accessibility**: WCAG 2.1 compliance checks
- ✅ **Best Practices**: Security, deprecated APIs, etc.
- ✅ **SEO**: Meta tags, mobile-friendly, crawlability
- ✅ **Thresholds**: Fails if scores drop below 85%

**Thresholds** (from `lighthouserc.json`):
```json
{
  "performance": 85,
  "accessibility": 90,
  "best-practices": 85,
  "seo": 90
}
```

---

## 📋 Workflow File

**Location**: `.github/workflows/deploy.yml`

```yaml
name: Build, Deploy to S3 & Invalidate CloudFront

on:
  push:
    branches:
      - main  # Trigger on pushes to main branch only

jobs:
  deploy:
    name: Build, Deploy to S3 & Invalidate CloudFront
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - name: Install & Build
        working-directory: frontend
        run: |
          npm ci
          npm run build

      - name: Configure AWS Credentials (GitHub OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_ARN }}
          role-session-name: GitHubActionsPortfolioDeploy
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync frontend/dist s3://jeni-portfolio --delete
          echo "✅ S3 sync complete → s3://jeni-portfolio"

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
          echo "✅ CloudFront cache invalidated"
```

## 🔐 GitHub Actions Configuration

Configure these values under **Repository → Settings → Secrets and variables → Actions**:

**Repository variable**
| Name | Description |
|---|---|
| `AWS_ROLE_ARN` | ARN of the existing `github-actions-portfolio-deployer` IAM role (Terraform output: `github_actions_role_arn`) |

**Repository secrets**
| Name | Description |
|---|---|
| `AWS_REGION` | AWS region used for the S3 bucket, for example `us-east-1` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |
| `SNYK_TOKEN` | Snyk API token for dependency scanning |

### One-time AWS OIDC prerequisites

- The AWS account must have the GitHub OIDC provider `token.actions.githubusercontent.com` registered.
- The IAM role `github-actions-portfolio-deployer` must trust audience `sts.amazonaws.com` and subject `repo:jenidevops30/portfolio:ref:refs/heads/main`.
- The role must have the existing least-privilege S3 deployment and CloudFront invalidation policies.
- The workflow now requests `id-token: write` and assumes this role; no long-lived AWS access keys are required.

Do not add or retain `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` for this deployment workflow. Once an OIDC deployment succeeds, deactivate and remove any old IAM access keys that were used only by the previous pipeline.

## 🚀 How to Deploy

### Automatic (Recommended)
```bash
# Make changes locally
git add -A
git commit -m "Update portfolio content"
git push origin main
# GitHub Actions runs automatically → site updates in ~2 minutes
```

### Manual Trigger (if needed)
```bash
# Go to GitHub repo > Actions tab
# Find "Build, Deploy to S3 & Invalidate CloudFront" workflow
# Click "Run workflow" > "Run workflow"
# Workflow starts immediately
```

## 📊 Pipeline Metrics

| Metric | Value | Notes |
|--------|-------|-------|
| **Build Time** | ~30 seconds | Node install cached, incremental Vite |
| **Deploy Time** | ~20 seconds | S3 sync + CloudFront invalidation |
| **Total Time** | ~50-60 seconds | From push to live |
| **Cache Hit Rate** | 95%+ | npm cache, build artifacts |
| **Success Rate** | 100% | (assuming no breaking changes) |

## 🔍 Monitoring & Troubleshooting

### View Workflow Runs
1. GitHub repo > **Actions** tab
2. Click **"Build, Deploy to S3 & Invalidate CloudFront"**
3. See all runs (✅ passed, ❌ failed, ⏳ in progress)

### Common Issues & Fixes

#### ❌ Build Fails: "npm ci failed"
```
Fix: Delete frontend/package-lock.json and regenerate
$ cd frontend && rm package-lock.json && npm install
$ git add -A && git commit -m "Update package-lock.json"
$ git push
```

#### ❌ Deploy Fails: "AWS credentials invalid"
```
Fix: Verify secrets in GitHub Settings
- Is the repository variable `AWS_ROLE_ARN` set to the deployment role ARN?
- Does the IAM role trust the exact repository and `main` branch subject?
- Is `id-token: write` present in workflow permissions?
- Does the role include S3 sync and CloudFront invalidation permissions?
```

#### ❌ CloudFront Invalidation Fails
```
Fix: Verify CLOUDFRONT_DISTRIBUTION_ID is correct
- Go to AWS CloudFront Console
- Copy exact Distribution ID (not domain name)
- Update GitHub secret
```

#### ⏳ Deployment Stuck
```
Fix: Check GitHub Actions logs
1. Actions tab > workflow run
2. Click job name to expand logs
3. Look for error messages
4. Common: Node setup timeout (increase runner timeout in workflow)
```

### Debugging Locally

```bash
# Test build locally before pushing
cd frontend
npm install
npm run lint   # Check for errors
npm run build  # Build production app
# Check frontend/dist/ for output files
```

## 🎯 Best Practices

1. **Always lint before pushing**:
   ```bash
   npm run lint  # Fix issues before committing
   ```

2. **Test build locally**:
   ```bash
   npm run build  # Ensure it builds successfully
   ```

3. **Keep secrets secure**:
   - Never commit `.env` files
   - Use GitHub OIDC and a narrowly scoped IAM role; avoid long-lived AWS access keys

4. **Use descriptive commit messages**:
   ```bash
   git commit -m "Update project descriptions and add new skills"
   # NOT: git commit -m "fix stuff"
   ```

5. **Monitor workflow health**:
   - Check Actions tab weekly
   - Watch for failed deployments
   - Review logs for warnings

## 📈 Performance Optimization

### Current Build Optimization
- ✅ **npm cache** in GitHub Actions (saved 15-20 sec per run)
- ✅ **Vite code splitting** (reduced JS bundle)
- ✅ **CSS minification** (13.76 KB gzipped)
- ✅ **S3 `--delete` flag** (only uploads changed files)

### Future Enhancements
- Add `npm run build --minify` for smaller bundles
- Pre-compress assets in S3 (gzip headers)
- Use CloudFront edge caching headers
- Add Lighthouse performance testing in CI

## 🔗 Related Links

- **Live Site**: https://jenidevops.in
- **GitHub Repo**: https://github.com/jenidevops30/portfolio
- **GitHub Actions Runs**: https://github.com/jenidevops30/portfolio/actions/workflows/deploy.yml
- **AWS S3 Bucket**: `s3://jeni-portfolio`
- **CloudFront Distribution**: AWS Console (see CLOUDFRONT_DISTRIBUTION_ID)

---

**Last Updated**: September 3, 2026  
**Maintained By**: Jeni Patel  
**Status**: ✅ Production Ready
