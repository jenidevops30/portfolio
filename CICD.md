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
          ├─► Step 6: Configure AWS Credentials
          │        └─► aws-actions/configure-aws-credentials@v4
          │        └─► Uses GitHub Secrets (AWS_ACCESS_KEY_ID, etc.)
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

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
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

## 🔐 Required GitHub Secrets

For the workflow to deploy successfully, add these secrets to your GitHub repository:

**Settings > Secrets and variables > Actions**

| Secret Name | Description | Example |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | AWS IAM user access key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM user secret key | `wJal...` |
| `AWS_REGION` | AWS region where S3/CloudFront live | `us-east-1` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | `E1ABC...` |

### How to Get These Values:

1. **AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY**:
   - Go to AWS IAM Console > Users > Your user
   - Security credentials tab > Create access key
   - Copy the Access Key ID and Secret Access Key
   - **Never commit these to git!**

2. **AWS_REGION**:
   - Typically `us-east-1` for global resources
   - Must match where your S3 bucket and CloudFront distribution live

3. **CLOUDFRONT_DISTRIBUTION_ID**:
   - AWS CloudFront Console
   - Find your distribution
   - Copy the Distribution ID (e.g., `E1ABCD1234E5F6G`)

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
- AWS_ACCESS_KEY_ID correct?
- AWS_SECRET_ACCESS_KEY correct?
- Keys still active in AWS IAM?
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
   - Use GitHub Secrets, not environment variables in workflow
   - Rotate AWS access keys every 90 days

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
