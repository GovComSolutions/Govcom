# 🚀 Seamless CI/CD Pipeline Setup Guide

## Overview
This guide will help you set up a **seamless CI/CD pipeline** that automatically deploys your GovCom website to AWS Amplify whenever you push code changes.

## 🎯 What We're Building
- **Automatic builds** on every push to main/master branch
- **Automatic deployment** to AWS Amplify
- **Testing** before deployment
- **Build artifacts** for debugging
- **Manual trigger** option for testing

## 📋 Prerequisites
1. ✅ GitHub repository (already set up)
2. ✅ AWS Amplify app (already created)
3. ✅ AWS credentials with appropriate permissions

## 🔧 Step 1: Configure AWS Amplify Webhook

### In AWS Amplify Console:
1. Go to your app in AWS Amplify Console
2. Navigate to **App settings** → **General**
3. Find **Build settings** section
4. Copy the **Webhook URL** (we'll use this later)

## 🔑 Step 2: Set Up GitHub Secrets

### In GitHub Repository:
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

```
AWS_ACCESS_KEY_ID = your_aws_access_key
AWS_SECRET_ACCESS_KEY = your_aws_secret_access_key
AMPLIFY_WEBHOOK_URL = your_amplify_webhook_url
```

## 🚀 Step 3: Push the CI/CD Configuration

The GitHub Actions workflows are already created. Now push them:

```bash
git add .
git commit -m "Add CI/CD pipeline configuration"
git push origin main
```

## 📊 Step 4: Monitor Your Pipeline

### Check GitHub Actions:
1. Go to your repository → **Actions** tab
2. You'll see the workflow running automatically
3. Click on it to see detailed progress

### Check AWS Amplify:
1. Go to AWS Amplify Console
2. Your app will show build status
3. Builds will start automatically on code pushes

## 🔄 How It Works

### **On Every Push:**
1. **GitHub Actions** automatically triggers
2. **Build & Test** job runs (install deps, run tests, build app)
3. **Deploy** job triggers AWS Amplify build
4. **Website updates** automatically

### **Branch Protection:**
- **main/master**: Full build + deploy
- **develop**: Build + test only (no deploy)
- **feature branches**: Build + test only

## 🧪 Testing the Pipeline

### **Test 1: Make a Small Change**
```bash
# Edit any file (e.g., add a comment)
echo "<!-- Test comment -->" >> src/App.tsx

# Commit and push
git add .
git commit -m "Test CI/CD pipeline"
git push origin main
```

### **Test 2: Check Progress**
1. Go to **GitHub Actions** tab
2. Watch the workflow run
3. Check **AWS Amplify** console
4. Verify website updates

## 🔍 Troubleshooting

### **Build Fails:**
- Check GitHub Actions logs
- Verify all dependencies in `package.json`
- Ensure `npm run build` works locally

### **Deployment Fails:**
- Check AWS credentials in GitHub secrets
- Verify AWS Amplify app configuration
- Check `amplify.yml` file

### **Website Not Updating:**
- Verify webhook URL in AWS Amplify
- Check build logs in Amplify console
- Ensure `dist/` folder contains files

## 📱 Manual Deployment

### **Trigger Manually:**
1. Go to **Actions** tab in GitHub
2. Click **🚀 Deploy to AWS Amplify**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## 🎉 Success Indicators

### **✅ Pipeline Working:**
- GitHub Actions show green checkmarks
- AWS Amplify builds automatically
- Website updates within 2-5 minutes
- No manual intervention needed

### **🚨 Pipeline Issues:**
- Red X marks in GitHub Actions
- Build failures in Amplify console
- Website not updating

## 🔄 Continuous Improvement

### **Monitor:**
- Build times
- Success rates
- Deployment frequency

### **Optimize:**
- Cache dependencies
- Parallel jobs
- Build optimization

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs first
2. Verify AWS Amplify build logs
3. Ensure all secrets are set correctly
4. Test build locally with `npm run build`

---

## 🎯 **Next Steps:**
1. **Push the CI/CD configuration** to GitHub
2. **Set up GitHub secrets** with AWS credentials
3. **Make a test change** to trigger the pipeline
4. **Monitor** the automatic deployment

Your GovCom website will now deploy automatically on every code change! 🚀
