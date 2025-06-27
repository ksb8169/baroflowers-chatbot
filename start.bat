@echo off
echo.
echo ====================================
echo   Baro Flowers V3 Starting...
echo ====================================
echo.

REM Save current directory
set CURRENT_DIR=%cd%

REM Move to server directory
cd ..\server

REM Start proxy server
echo [1/2] Starting proxy server...
start cmd /k "node proxy-server-with-logs.js"

REM Wait for server to start
timeout /t 3 /nobreak > nul

REM Return to original directory
cd %CURRENT_DIR%

REM Open in web browser
echo [2/2] Opening web browser...
start index.html

echo.
echo ====================================
echo   Done! Browser should be open now.
echo ====================================
echo.
pause