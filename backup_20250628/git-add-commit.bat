@echo off
echo ===== Git Add and Commit Script =====
echo.

echo [1] Adding integrated UI files...
git add index-integrated.html
git add style-integrated.css
git add script-integrated.js
git add compare-versions.html
git add README-integrated.md

echo.
echo [2] Checking what will be committed...
git status

echo.
echo [3] If files are added correctly, press any key to commit...
pause

echo.
echo [4] Committing...
git commit -m "feat: Add integrated UI version for detail page integration"

echo.
echo [5] Pushing to GitHub...
git push origin main

echo.
echo ===== Complete! =====
pause