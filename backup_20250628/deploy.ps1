# PowerShell script for deployment
Write-Host "====== Baroflowers Deploy Script ======" -ForegroundColor Cyan
Write-Host ""

# Change to project directory
Set-Location "C:\Users\오늘\Desktop\chatbot-webapp\baroflowers-v3-latest"

# Check Git status
Write-Host "[1] Checking Git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Add files
Write-Host "[2] Adding new files..." -ForegroundColor Yellow
git add index-integrated.html style-integrated.css script-integrated.js compare-versions.html README-integrated.md
Write-Host ""

# Commit
Write-Host "[3] Creating commit..." -ForegroundColor Yellow
git commit -m "feat: Add integrated UI version for detail page"
Write-Host ""

# Push
Write-Host "[4] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main
Write-Host ""

Write-Host "====== Deploy Complete! ======" -ForegroundColor Green
Write-Host ""
Write-Host "Check deployment at:" -ForegroundColor Cyan
Write-Host "https://vercel.com/dashboard"
Write-Host ""
Write-Host "New URLs (available in 3-5 min):" -ForegroundColor Cyan
Write-Host "- Integrated: https://baroflowers-chatbot.vercel.app/index-integrated.html"
Write-Host "- Compare: https://baroflowers-chatbot.vercel.app/compare-versions.html"
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")