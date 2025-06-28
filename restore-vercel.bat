@echo off
echo Restoring Vercel mode...
cd /d "C:\Users\오늘\Desktop\chatbot-webapp\baroflowers-v3-latest"
copy script-vercel.js script.js
echo Done! Ready for Vercel deployment.
pause