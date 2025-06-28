@echo off
echo Cleaning up project files...

REM 불필요한 파일들 백업 폴더로 이동
move /Y deploy-*.* backup_20250628\ 2>nul
move /Y test-*.* backup_20250628\ 2>nul
move /Y index-ai-*.html backup_20250628\ 2>nul
move /Y index-figma-*.html backup_20250628\ 2>nul
move /Y index-with-*.html backup_20250628\ 2>nul
move /Y script-ai-*.js backup_20250628\ 2>nul
move /Y script-local.js backup_20250628\ 2>nul
move /Y style-ai-*.css backup_20250628\ 2>nul
move /Y style-clean.css backup_20250628\ 2>nul
move /Y style-integrated.css backup_20250628\ 2>nul
move /Y *comparison*.html backup_20250628\ 2>nul
move /Y *preview*.html backup_20250628\ 2>nul
move /Y logo-*.* backup_20250628\ 2>nul
move /Y figma-*.js backup_20250628\ 2>nul
move /Y compare-*.html backup_20250628\ 2>nul
move /Y README-integrated.md backup_20250628\ 2>nul
move /Y AI_DESIGN_GUIDE.md backup_20250628\ 2>nul
move /Y DEPLOY_NOW.md backup_20250628\ 2>nul
move /Y git-add-commit.bat backup_20250628\ 2>nul
move /Y cleanup*.* backup_20250628\ 2>nul
move /Y quick-cleanup.bat backup_20250628\ 2>nul
move /Y style_backup_*.css backup_20250628\ 2>nul

REM 가이드 문서들 이동
move /Y "로고_적용_가이드.md" backup_20250628\ 2>nul
move /Y "배포가이드-통합형.md" backup_20250628\ 2>nul
move /Y "색상_업데이트_가이드.md" backup_20250628\ 2>nul
move /Y "인코딩문제해결.md" backup_20250628\ 2>nul
move /Y "통합형UI구현가이드.md" backup_20250628\ 2>nul
move /Y "CLEANUP_GUIDE.md" backup_20250628\ 2>nul
move /Y "CLEANUP_COMPLETE.md" backup_20250628\ 2>nul

REM 실행 관련 배치 파일들
move /Y run.bat backup_20250628\ 2>nul
move /Y start.bat backup_20250628\ 2>nul
move /Y upload-to-github.bat backup_20250628\ 2>nul
move /Y restore-vercel.bat backup_20250628\ 2>nul

echo.
echo Cleanup complete!
echo.
echo Remaining core files:
dir /b *.html *.js *.css *.json *.md
echo.
pause