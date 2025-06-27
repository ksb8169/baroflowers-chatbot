@echo off
echo ===== GitHub Upload for ksb8169 =====
echo.

cd /d "C:\Users\오늘\Desktop\chatbot-webapp\baroflowers-v3-latest"

echo Current folder: baroflowers-v3-latest
echo.

echo [1] Initializing Git...
git init
echo.

echo [2] Setting user info...
git config user.name "ksb8169"
git config user.email "ksb8169@naver.com"
echo.

echo [3] Adding all files...
git add .
git status
echo.

echo [4] Creating commit...
git commit -m "Baroflowers chatbot - ready to deploy"
echo.

echo [5] Adding GitHub repository...
git remote remove origin 2>nul
git remote add origin https://github.com/ksb8169/baroflowers-chatbot.git
echo.

echo [6] Pushing to GitHub...
git branch -M main
git push -u origin main -f

echo.
echo ===== Complete! =====
echo.
echo Check your repository at:
echo https://github.com/ksb8169/baroflowers-chatbot
echo.
pause