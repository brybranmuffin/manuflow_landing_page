# GitHub Pages Deployment Guide

This guide will help you deploy your startup landing page to GitHub Pages.

## What Changed for GitHub Pages

I've modified your app to work as a static site:

### ✅ Changes Made:
- **Removed Express backend** - GitHub Pages only serves static files
- **Updated form submission** - Now uses Netlify Forms for beta signups
- **Created static build configuration** - New Vite config for static deployment
- **Added GitHub Actions workflow** - Automatic deployment on push
- **Simplified dependencies** - Removed server-side packages

### 📝 Form Handling:
The beta signup form now uses Netlify Forms, which will work on any static hosting platform including GitHub Pages.

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Convert to static site for GitHub Pages"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **GitHub Actions**

### 3. Wait for Deployment
The GitHub Action will automatically:
- Install dependencies
- Build your site
- Deploy to GitHub Pages

Your site will be available at: `https://yourusername.github.io/your-repo-name`

## Alternative: Manual Build

If you prefer manual deployment:

```bash
# Use the static package.json
cp package-static.json package.json

# Install dependencies
npm install

# Build the site
npm run build

# The built files will be in the 'dist' folder
# Upload the 'dist' folder contents to your hosting provider
```

## Form Submissions

### For Netlify Hosting:
If you deploy to Netlify instead of GitHub Pages, the form will work automatically.

### For GitHub Pages:
The form is configured for Netlify Forms. To make it work on GitHub Pages, you'll need to:

1. Use a form service like:
   - Formspree.io
   - Netlify Forms (if you deploy to Netlify)
   - EmailJS
   - Your own backend API

2. Update the form action in `client/src/pages/landing-static.tsx`

## File Structure for Static Deployment

```
├── .github/workflows/deploy.yml    # GitHub Actions deployment
├── client/
│   ├── src/pages/landing-static.tsx # Static version of landing page
│   └── public/_redirects            # Netlify redirects (if needed)
├── package-static.json              # Dependencies for static build
├── vite.config.static.ts           # Vite config for static build
└── README-GITHUB-DEPLOYMENT.md     # This guide
```

## Benefits of Static Deployment

✅ **Fast loading** - No server processing  
✅ **Free hosting** - GitHub Pages is free  
✅ **Reliable** - Static files are very stable  
✅ **CDN delivery** - Global content delivery  
✅ **HTTPS included** - Secure by default  

## Limitations

❌ **No backend API** - Can't process forms server-side  
❌ **No database** - All data must be handled externally  
❌ **No server logic** - Everything runs in the browser  

Your landing page will work perfectly for showcasing your product and collecting beta signups!