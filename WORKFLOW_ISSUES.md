# ❌ GITHUB ACTIONS WORKFLOW - CRITICAL ISSUES

## PROBLEM 1: Wrong Branch Trigger 🔴

```yaml
on:
  push:
    branches:
      - main  ❌ WRONG!
```

**Issue:** You pushed to `v2` branch, but workflow only triggers on `main` branch!

**Result:** 
- ❌ Workflow NEVER runs when you push to v2
- ❌ App NEVER builds
- ❌ Files NEVER deploy to S3
- ❌ Site stays BLANK

---

## PROBLEM 2: Missing Build Steps 🔴

```yaml
steps:
  - Checkout code
  - Configure AWS Credentials
  - Deploy to S3          ❌ SYNCS ROOT, NOT BUILT dist/
  - Invalidate CloudFront
```

**Issue:** Workflow syncs ENTIRE ROOT directory to S3, NOT the built dist/ folder!

**What happens:**
```
aws s3 sync . s3://jeni-portfolio \
  --exclude ".git/*" \
  --exclude ".github/*" \
  ...
```

This syncs:
- ❌ package.json (source code, not needed)
- ❌ src/ folder (source code, not needed)
- ❌ vite.config.js (source code, not needed)
- ✅ Only static files (but React app never built!)

**What should happen:**
```
npm run build           ← Build React app first!
aws s3 sync dist/ ...  ← Deploy ONLY built files
```

---

## THE FIX: Correct Workflow for V2

Replace `.github/workflows/deploy.yml` with this:

```yaml
name: Deploy Portfolio to S3 + CloudFront

on:
  push:
    branches:
      - v2                    ✅ CHANGED: Listen for v2 branch

jobs:
  deploy:
    name: Build & Deploy to S3
    runs-on: ubuntu-latest

    steps:
      # 1. Checkout code
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. Setup Node.js (NEW - WAS MISSING)
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      # 3. Install & Build (NEW - WAS MISSING)
      - name: Install & Build
        run: |
          npm ci
          npm run build
          echo "✅ Build complete"

      # 4. Configure AWS credentials
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      # 5. Deploy ONLY dist/ folder to S3 (CHANGED)
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://jeni-portfolio/ \
            --delete \
            --region us-east-1
          echo "✅ S3 deployment complete"

      # 6. Invalidate CloudFront
      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*" \
            --region us-east-1
          echo "✅ CloudFront cache invalidated"

      # 7. Summary
      - name: Deployment Summary
        run: |
          echo "🚀 Portfolio deployed successfully!"
          echo "🌐 Live URL: https://jenidevops.in"
          echo "📦 Deployed from: v2 branch"
```

---

## KEY CHANGES

### ❌ OLD WORKFLOW
```yaml
on:
  push:
    branches: [main]         ❌ Wrong branch
    
steps:
  - Checkout
  - AWS Config
  - aws s3 sync .           ❌ Syncs root (source code!)
  - Invalidate CF
```

### ✅ NEW WORKFLOW  
```yaml
on:
  push:
    branches: [v2]           ✅ Correct branch

steps:
  - Checkout
  - Setup Node.js           ✅ NEW
  - npm ci + npm build      ✅ NEW (builds React app)
  - AWS Config
  - aws s3 sync dist/       ✅ Syncs ONLY built files
  - Invalidate CF
```

---

## WHAT HAPPENS NOW

### Before (OLD)
```
git push origin main
    ↓
Workflow triggers
    ↓
Syncs root directory (includes src/, node_modules, etc)
    ↓
S3 gets messy folders
    ↓
index.html doesn't have React app
    ↓
BLANK SITE ❌
```

### After (NEW)
```
git push origin v2
    ↓
Workflow triggers ✅
    ↓
npm ci (install deps)
    ↓
npm run build (build React app)
    ↓
Syncs dist/ only (minified, optimized)
    ↓
S3 gets: index.html + assets/css + assets/js + images
    ↓
React app renders correctly
    ↓
LIVE PORTFOLIO ✅
```

---

## DEPLOY NOW

1. **Update workflow file** (`.github/workflows/deploy.yml`) with the corrected version above

2. **Commit and push to v2**:
```bash
cd /home/claude/portfolio
git add .github/workflows/deploy.yml
git commit -m "fix: update workflow to build and deploy from v2 branch"
git push origin v2
```

3. **Monitor deployment**:
```
https://github.com/jenidevops30/portfolio/actions
```

4. **Wait 2-3 minutes** for:
   - Build ✓
   - Deploy to S3 ✓
   - CloudFront invalidation ✓

5. **Test**:
   - Hard refresh: Ctrl+Shift+Delete
   - Visit: https://jenidevops.in
   - Should see full portfolio!

---

## SUMMARY

| Issue | Current (Broken) | Fixed |
|-------|------------------|-------|
| **Branch** | `main` | `v2` ✅ |
| **Build step** | Missing | `npm run build` ✅ |
| **Deploy source** | Root directory | `dist/` ✅ |
| **Result** | Blank site | Full portfolio ✅ |

