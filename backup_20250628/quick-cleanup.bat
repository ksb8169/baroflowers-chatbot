@echo off
echo Moving files to backup folder...

move deploy-*.* backup_20250628\ 2>nul
move DEPLOY_NOW.md backup_20250628\ 2>nul
move git-add-commit.bat backup_20250628\ 2>nul
move test-*.html backup_20250628\ 2>nul
move test-*.bat backup_20250628\ 2>nul
move index-ai-design.html backup_20250628\ 2>nul
move index-figma-sync.html backup_20250628\ 2>nul
move index-with-logo.html backup_20250628\ 2>nul
move script-ai-design.js backup_20250628\ 2>nul
move style-ai-design.css backup_20250628\ 2>nul
move design-comparison.html backup_20250628\ 2>nul
move color-update-preview.html backup_20250628\ 2>nul
move logo-selector.html backup_20250628\ 2>nul
move figma-auto-sync.js backup_20250628\ 2>nul
move index-integrated.html backup_20250628\ 2>nul
move script-integrated.js backup_20250628\ 2>nul
move style-integrated.css backup_20250628\ 2>nul
move compare-versions.html backup_20250628\ 2>nul
move README-integrated.md backup_20250628\ 2>nul
move AI_DESIGN_GUIDE.md backup_20250628\ 2>nul
move script-local.js backup_20250628\ 2>nul
move logo-designs.svg backup_20250628\ 2>nul
move "로고_적용_가이드.md" backup_20250628\ 2>nul
move "배포가이드-통합형.md" backup_20250628\ 2>nul
move "색상_업데이트_가이드.md" backup_20250628\ 2>nul
move "인코딩문제해결.md" backup_20250628\ 2>nul
move "통합형UI구현가이드.md" backup_20250628\ 2>nul
move style-clean.css backup_20250628\ 2>nul
move CLEANUP_GUIDE.md backup_20250628\ 2>nul
move cleanup.bat backup_20250628\ 2>nul

echo Done!