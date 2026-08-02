# 🤖 ANTIGRAVITY PROMPT - PORTFOLIO WORKFLOW FIX

Copy and paste this entire prompt into Claude Code / Antigravity / Your AI Tool:

---

## PROMPT START

I have a React/Vite portfolio website hosted on AWS S3 + CloudFront. The site is currently BLANK because my GitHub Actions workflow has critical bugs.

### Current Situation:
- Repository: https://github.com/jenidevops30/portfolio
- Branch: v2 (contains React app with Vite)
- Status: Portfolio is blank at https://jenidevops.in
- Cause: GitHub Actions workflow has 2 critical bugs

### The Problems:

**Problem 1: Wrong Branch Trigger**
- Current: Workflow only triggers on `main` branch
- Issue: I'm pushing to `v2` branch, so workflow NEVER runs
- File: `.github/workflows/deploy.yml` line with `branches: [main]`

**Problem 2: Missing Build Steps**
- Current: No npm install or npm build steps
- Issue: React app never gets compiled to dist/
- Result: Only source code gets uploaded to S3

**Problem 3: Wrong Deploy Source**
- Current: Syncs entire root directory to S3
- Issue: Should only sync built `dist/` folder
- Problem: Source code gets uploaded to production

### What I Need:

1. **Fix `.github/workflows/deploy.yml`:**
   - Change branch trigger from `main` to `v2`
   - Add Node.js setup step (v22)
   - Add `npm ci` step to install dependencies
   - Add `npm run build` step to compile React app
   - Change deploy command to sync `dist/` folder only (not root)
   - Keep CloudFront invalidation

2. **Verify the fix:**
   - Ensure workflow has all required steps in correct order
   - Confirm AWS credentials configuration is correct
   - Verify S3 sync uses `dist/` not `.`
   - Confirm CloudFront invalidation targets all paths

3. **Output:**
   - Provide corrected `.github/workflows/deploy.yml` file content
   - Show deployment flow diagram
   - List verification steps after push

### Portfolio Details:
- Framework: React 19 + Vite
- Build command: `npm run build`
- Build output: `dist/` folder
- S3 bucket: jeni-portfolio
- CloudFront distribution: E1P40QNZBIV4TP
- Domain: jenidevops.in
- AWS Region: us-east-1

### Portfolio Content (Already Verified):
- ✅ Skills section (16 technologies)
- ✅ Projects section (5 featured projects)
- ✅ Experience timeline (4 roles)
- ✅ About section
- ✅ Contact section

### GitHub Secrets Already Set:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION (us-east-1)
- CLOUDFRONT_DISTRIBUTION_ID (E1P40QNZBIV4TP)

### Task:
1. Fix the GitHub Actions workflow file
2. Show before/after comparison
3. Provide step-by-step deployment instructions
4. Include verification checklist
5. Explain what happens when fixed

### Expected Result:
After fix, when I push to v2 branch:
1. Workflow triggers automatically ✅
2. Node.js 22 installed ✅
3. Dependencies installed (npm ci) ✅
4. React app compiled (npm run build) ✅
5. Built files synced to S3 (dist/ only) ✅
6. CloudFront cache invalidated ✅
7. Portfolio goes live with full content ✅

### Current Workflow (BROKEN):
```yaml
name: Deploy Portfolio to S3 + CloudFront

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy to S3 & Invalidate CloudFront
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync . s3://jeni-portfolio \
            --exclude ".git/*" \
            --exclude ".github/*" \
            --exclude "README.md" \
            --exclude "*.jpeg" \
            --exclude "*.jpg" \
            --delete
          echo "✅ S3 sync complete → s3://jeni-portfolio"

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
          echo "✅ CloudFront cache invalidated"

      - name: Deployment Summary
        run: |
          echo "🚀 Portfolio deployed successfully!"
          echo "🌐 Live URL: https://d3n8nd35qm5vvz.cloudfront.net"
```

### Fix Requirements:
- ✅ Change `branches: [main]` to `branches: [v2]`
- ✅ Add GitHub Actions Node.js setup action
- ✅ Add npm ci step
- ✅ Add npm run build step
- ✅ Change sync from `. s3://jeni-portfolio` to `dist/ s3://jeni-portfolio`
- ✅ Keep all other configuration same
- ✅ Add verbose logging for debugging

### Note:
This is the final piece needed to go live. The React app builds successfully, content is ready, infrastructure is configured. Only the workflow needs fixing.

---

## PROMPT END

---

## How to Use This Prompt:

### Option 1: Claude Code / Antigravity
1. Copy entire prompt above (from "PROMPT START" to "PROMPT END")
2. Paste into Claude Code / Antigravity interface
3. Wait for response with fixed workflow
4. Follow the deployment instructions

### Option 2: Direct GitHub Edit
If you prefer to edit directly:
1. Open your GitHub repo
2. Navigate to `.github/workflows/deploy.yml`
3. Click edit (pencil icon)
4. Replace content with fixed version provided by AI
5. Commit directly to v2 branch

### Option 3: Use Claude Web/Chat
1. Paste prompt into Claude at claude.ai
2. Get workflow fix
3. Copy/paste to GitHub

---

## What to Expect:

The AI should respond with:
1. ✅ Corrected workflow file
2. ✅ Before/after comparison
3. ✅ Deployment instructions
4. ✅ Verification steps
5. ✅ Troubleshooting guide

---

## After Getting the Fix:

1. **Update workflow file:**
   - Replace `.github/workflows/deploy.yml` content
   - Commit to v2 branch
   - Push to origin

2. **Monitor deployment:**
   - Check GitHub Actions tab
   - Watch for success
   - Wait 2-3 minutes

3. **Test site:**
   - Hard refresh browser
   - Visit https://jenidevops.in
   - Verify all sections load

4. **Celebrate:**
   - 🎉 Portfolio is LIVE!

---

## Key Points:

- **Low Risk:** Only fixing workflow, no code changes
- **Fast:** 2-3 minute deployment once pushed
- **Automated:** No manual steps needed after push
- **Verified:** React app builds successfully locally
- **Complete:** All content is ready

---

**Status:** Ready to deploy  
**Blockers:** None (only workflow fix needed)  
**ETA:** 15 minutes from now (10 min to fix, 5 min to deploy)

