#!/usr/bin/env powershell
# ============================================================
# 30-Day Red Team Tracker — Deploy Script
# Run this any time to publish the latest version to Netlify
# ============================================================

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "  30-Day Red Team Tracker Deploy  " -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

# Navigate to project
Set-Location "C:\Users\dell\.gemini\antigravity\scratch\redteam-tracker"

# Build
Write-Host "[1/2] Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy
Write-Host ""
Write-Host "[2/2] Deploying to Netlify..." -ForegroundColor Cyan
netlify deploy --dir dist --prod --allow-anonymous

Write-Host ""
Write-Host "Done! Check the Site URL above." -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Open the 'Claim on Netlify' link within 60 minutes" -ForegroundColor Yellow
Write-Host "to make the URL permanent (free Netlify account required)." -ForegroundColor Yellow
Write-Host ""
