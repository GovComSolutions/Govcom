# 🚀 Setting up GitHub repository for GovCom CI/CD Pipeline

Write-Host "🚀 Setting up GitHub repository for GovCom CI/CD Pipeline" -ForegroundColor Green
Write-Host ""

# Get GitHub username
$GITHUB_USERNAME = Read-Host "Enter your GitHub username"

# Get repository name
$REPO_NAME = Read-Host "Enter your repository name (default: GovCom)"
if ([string]::IsNullOrEmpty($REPO_NAME)) {
    $REPO_NAME = "GovCom"
}

Write-Host ""
Write-Host "📝 Setting up remote repository..." -ForegroundColor Yellow
Write-Host "Username: $GITHUB_USERNAME"
Write-Host "Repository: $REPO_NAME"
Write-Host ""

# Add the remote origin
git remote add origin "git@github.com:$GITHUB_USERNAME/$REPO_NAME.git"

Write-Host "✅ Remote origin added!" -ForegroundColor Green
Write-Host "🔗 Remote URL: git@github.com:$GITHUB_USERNAME/$REPO_NAME.git"
Write-Host ""

# Test the connection
Write-Host "🧪 Testing connection to GitHub..." -ForegroundColor Yellow
try {
    $result = git ls-remote origin 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Connection successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Ready to push your CI/CD pipeline!" -ForegroundColor Green
        Write-Host "Run: git push origin master"
    }
    else {
        throw "Connection failed"
    }
}
catch {
    Write-Host "❌ Connection failed!" -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "1. Your GitHub username is correct"
    Write-Host "2. The repository exists on GitHub"
    Write-Host "3. You have SSH access set up"
    Write-Host ""
    Write-Host "💡 To create the repository on GitHub:" -ForegroundColor Cyan
    Write-Host "1. Go to https://github.com/new"
    Write-Host "2. Name it: $REPO_NAME"
    Write-Host "3. Make it public or private"
    Write-Host "4. Don't initialize with README (we already have files)"
}
