@echo off
chcp 65001 > nul
echo.
echo ====== Baroflowers Deploy Script ======
echo.

echo [1] Checking Git status...
git status

echo.
echo [2] Adding new files...
git add *.html *.css *.js *.md

echo.
echo [3] Creating commit...
git commit -m "feat: Add integrated UI version for detail page"

echo.
echo [4] Pushing to GitHub...
git push origin main

echo.
echo ====== Deploy Complete! ======
echo.
echo Check deployment at:
echo https://vercel.com/dashboard
echo.
echo New URLs (available in 3-5 min):
echo https://baroflowers-chatbot.vercel.app/index-integrated.html
echo https://baroflowers-chatbot.vercel.app/compare-versions.html
echo.
pause