#!/bin/bash

echo "🚀 Setting up GitHub repository for GovCom CI/CD Pipeline"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Get repository name
read -p "Enter your repository name (default: GovCom): " REPO_NAME
REPO_NAME=${REPO_NAME:-GovCom}

echo ""
echo "📝 Setting up remote repository..."
echo "Username: $GITHUB_USERNAME"
echo "Repository: $REPO_NAME"
echo ""

# Add the remote origin
git remote add origin git@github.com:$GITHUB_USERNAME/$REPO_NAME.git

echo "✅ Remote origin added!"
echo "🔗 Remote URL: git@github.com:$GITHUB_USERNAME/$REPO_NAME.git"
echo ""

# Test the connection
echo "🧪 Testing connection to GitHub..."
if git ls-remote origin > /dev/null 2>&1; then
    echo "✅ Connection successful!"
    echo ""
    echo "🚀 Ready to push your CI/CD pipeline!"
    echo "Run: git push origin master"
else
    echo "❌ Connection failed!"
    echo "Please check:"
    echo "1. Your GitHub username is correct"
    echo "2. The repository exists on GitHub"
    echo "3. You have SSH access set up"
    echo ""
    echo "💡 To create the repository on GitHub:"
    echo "1. Go to https://github.com/new"
    echo "2. Name it: $REPO_NAME"
    echo "3. Make it public or private"
    echo "4. Don't initialize with README (we already have files)"
fi
