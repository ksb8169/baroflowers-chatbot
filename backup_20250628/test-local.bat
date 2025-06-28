@echo off
echo ===== Local Test Mode =====
echo.

REM Change to local script
cd /d "C:\Users\오늘\Desktop\chatbot-webapp\baroflowers-v3-latest"
copy script.js script-vercel.js
copy script-local.js script.js

echo Starting proxy server...
start cmd /k "cd /d C:\Users\오늘\Desktop\chatbot-webapp\server && node proxy-server.js"

echo.
echo Waiting 3 seconds for server to start...
timeout /t 3 /nobreak > nul

echo.
echo Opening browser...
start index.html

echo.
echo ===== Test Mode Active =====
echo.
echo To stop test mode:
echo 1. Close the proxy server window
echo 2. Run restore-vercel.bat
echo.
pause