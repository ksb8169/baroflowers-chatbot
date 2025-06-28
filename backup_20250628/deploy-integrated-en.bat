@echo off
echo ========================================
echo Baroflowers Integrated UI GitHub Upload
echo ========================================
echo.

REM Check Git status
echo Checking current Git status...
git status
echo.

REM Add new files
echo Adding new integrated UI files...
git add index-integrated.html
git add style-integrated.css
git add script-integrated.js
git add compare-versions.html
git add README-integrated.md
echo.

REM Commit
echo Committing changes...
git commit -m "feat: Add integrated UI version - optimized for detail page integration"
echo.

REM Push to GitHub
echo Uploading to GitHub...
git push origin main
echo.

echo ========================================
echo COMPLETED! Vercel will start deployment automatically.
echo Deployment status: https://vercel.com/dashboard
echo Check in 3-5 minutes: https://baroflowers-chatbot.vercel.app/
echo.
echo New version URLs:
echo    - Integrated: https://baroflowers-chatbot.vercel.app/index-integrated.html
echo    - Compare: https://baroflowers-chatbot.vercel.app/compare-versions.html
echo ========================================
echo.
pause