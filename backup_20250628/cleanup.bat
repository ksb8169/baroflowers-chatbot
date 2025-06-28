@echo off
echo ===== Cleaning up project folder =====
echo.

echo Creating backup folder...
if not exist backup_20250628 mkdir backup_20250628

echo.
echo Moving unnecessary files to backup...

REM 배포 관련 파일들
move deploy-*.* backup_20250628\ 2>nul
move DEPLOY_NOW.md backup_20250628\ 2>nul
move git-add-commit.bat backup_20250628\ 2>nul

REM 테스트 파일들
move test-*.html backup_20250628\ 2>nul
move test-*.bat backup_20250628\ 2>nul

REM 디자인 관련 임시 파일들
move index-ai-design.html backup_20250628\ 2>nul
move index-figma-sync.html backup_20250628\ 2>nul
move index-with-logo.html backup_20250628\ 2>nul
move script-ai-design.js backup_20250628\ 2>nul
move style-ai-design.css backup_20250628\ 2>nul
move design-comparison.html backup_20250628\ 2>nul
move color-update-preview.html backup_20250628\ 2>nul
move logo-selector.html backup_20250628\ 2>nul
move figma-auto-sync.js backup_20250628\ 2>nul

REM 통합형 파일들 (나중에 필요하면 백업에서 복구)
move index-integrated.html backup_20250628\ 2>nul
move script-integrated.js backup_20250628\ 2>nul
move style-integrated.css backup_20250628\ 2>nul
move compare-versions.html backup_20250628\ 2>nul
move README-integrated.md backup_20250628\ 2>nul

REM 가이드 문서들
move *가이드*.md backup_20250628\ 2>nul
move 인코딩문제해결.md backup_20250628\ 2>nul
move AI_DESIGN_GUIDE.md backup_20250628\ 2>nul

REM 로컬 스크립트
move script-local.js backup_20250628\ 2>nul

echo.
echo ===== Cleanup Complete! =====
echo.
echo Remaining core files:
dir /b *.html *.js *.css *.json *.md
echo.
pause