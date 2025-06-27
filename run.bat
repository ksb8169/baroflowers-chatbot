@echo off
cd ..\server
start cmd /k node proxy-server-with-logs.js
timeout /t 3 > nul
cd ..\baroflowers-v3-latest
start index.html
exit