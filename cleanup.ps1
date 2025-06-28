# PowerShell 정리 스크립트
$backupFolder = "backup_20250628"

# 백업할 파일 목록
$filesToMove = @(
    "deploy-*.bat",
    "deploy-*.sh", 
    "deploy.ps1",
    "DEPLOY_NOW.md",
    "git-add-commit.bat",
    "test-*.html",
    "test-*.bat",
    "index-ai-design.html",
    "index-figma-sync.html", 
    "index-with-logo.html",
    "script-ai-design.js",
    "style-ai-design.css",
    "design-comparison.html",
    "color-update-preview.html",
    "logo-selector.html",
    "figma-auto-sync.js",
    "style-integrated.css",
    "compare-versions.html",
    "README-integrated.md",
    "AI_DESIGN_GUIDE.md",
    "script-local.js",
    "logo-designs.svg",
    "*가이드*.md",
    "인코딩문제해결.md",
    "style-clean.css",
    "CLEANUP_GUIDE.md",
    "cleanup.bat",
    "quick-cleanup.bat"
)

# 파일 이동
foreach ($pattern in $filesToMove) {
    Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | ForEach-Object {
        Move-Item $_.FullName -Destination $backupFolder -Force
        Write-Host "Moved: $($_.Name)"
    }
}

Write-Host "`n정리 완료!" -ForegroundColor Green
Write-Host "`n남은 핵심 파일들:" -ForegroundColor Yellow
Get-ChildItem -File | Where-Object { $_.Name -notmatch "backup" } | Select-Object Name