# PowerShell script để publish các packages theo thứ tự đúng

$ErrorActionPreference = "Stop"

Write-Host "📦 Publishing Base CMS Monorepo Packages" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Build tất cả packages
Write-Host "🔨 Building all packages..." -ForegroundColor Yellow
npm run build
Write-Host "✅ Build completed!" -ForegroundColor Green
Write-Host ""

# Publish base-cms-dev trước (vì base-cms depend on nó)
Write-Host "📤 Publishing @libeyondea/base-cms-dev..." -ForegroundColor Yellow
Set-Location packages\base-cms-dev
npm publish --access public
Set-Location ..\..
Write-Host "✅ @libeyondea/base-cms-dev published!" -ForegroundColor Green
Write-Host ""

# Đợi một chút để package được sync
Write-Host "⏳ Waiting for package to sync..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Write-Host ""

# Publish base-cms
Write-Host "📤 Publishing @libeyondea/base-cms..." -ForegroundColor Yellow
Set-Location packages\base-cms
npm publish --access public
Set-Location ..\..
Write-Host "✅ @libeyondea/base-cms published!" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 All packages published successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Published packages:" -ForegroundColor White
Write-Host "  - @libeyondea/base-cms-dev" -ForegroundColor Gray
Write-Host "  - @libeyondea/base-cms" -ForegroundColor Gray

