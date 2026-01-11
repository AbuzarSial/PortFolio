# GitHub Push Instructions

## Step 1: Create a GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `portfolio` (or any name you prefer)
5. Description: "Personal Portfolio Website - Abuzar Sial"
6. Choose **Public** or **Private**
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /Users/abuzarsial/Desktop/projects/portfolio/PortFolio

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

## Quick Push Command

If you already have the repository URL, run:

```bash
cd /Users/abuzarsial/Desktop/projects/portfolio/PortFolio
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## Note

- Make sure you're logged into GitHub
- If prompted, enter your GitHub username and password (or use a Personal Access Token)
- The project is ready to push!
