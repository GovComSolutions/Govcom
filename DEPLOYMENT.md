# 🚀 GovCom Website Deployment Guide

## AWS Amplify Deployment

Your GovCom website is now properly configured for AWS Amplify deployment!

### 📁 Required Files (Already Created)
- ✅ `amplify.yml` - Build configuration
- ✅ `deploy.sh` - Linux/Mac deployment script  
- ✅ `deploy.ps1` - Windows PowerShell deployment script
- ✅ `vite.config.ts` - Updated Vite configuration

### 🔧 Build Configuration
The `amplify.yml` file tells AWS Amplify:
1. **PreBuild:** Install dependencies with `npm ci`
2. **Build:** Create production build with `npm run build`
3. **Artifacts:** Serve files from `dist/` directory
4. **Cache:** Cache `node_modules/` for faster builds

### 🚀 Deployment Steps

#### Option 1: Automatic (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to AWS Amplify
3. Amplify will automatically build and deploy using `amplify.yml`

#### Option 2: Manual Deployment
```bash
# Linux/Mac
./deploy.sh

# Windows PowerShell
.\deploy.ps1
```

### 🧪 Test Build Locally
```bash
npm install
npm run build
```

This creates a `dist/` folder with your production-ready website.

### 📱 Your Website
- **Local Development:** http://localhost:8081/
- **Production:** Your AWS Amplify URL

### 🔍 Troubleshooting

#### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally
- Check AWS Amplify build logs

#### Website Not Loading
- Verify `amplify.yml` points to `dist/` directory
- Check that `dist/index.html` exists after build
- Ensure all assets are copied to `dist/` folder

#### Dependencies Missing
- Run `npm install` locally to verify
- Check `package-lock.json` is committed
- Ensure `node_modules/` is in `.gitignore`

### 📊 Build Output
Your build creates:
- `dist/index.html` - Main HTML file
- `dist/assets/` - CSS and JavaScript bundles
- `dist/logos/` - Logo images
- All video and image assets

### 🎯 Next Steps
1. **Commit and push** your updated configuration
2. **Connect repository** to AWS Amplify
3. **Deploy** and test your website
4. **Monitor** build logs for any issues

Your GovCom website should now deploy successfully on AWS Amplify! 🎉
