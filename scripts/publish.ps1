# PowerShell script để publish các packages theo thứ tự đúng

$ErrorActionPreference = "Stop"

# Function để kiểm tra exit code và dừng nếu có lỗi
function Test-CommandSuccess {
    param(
        [string]$Command,
        [string]$ErrorMessage
    )
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ ERROR: $ErrorMessage" -ForegroundColor Red
        Write-Host "Command failed: $Command" -ForegroundColor Red
        Write-Host "Exit code: $LASTEXITCODE" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

# Function để thực hiện npm command với error handling
function Invoke-NpmCommand {
    param(
        [string]$Command,
        [string]$WorkingDirectory = ".",
        [string]$ErrorMessage
    )
    
    Write-Host "🔄 Executing: $Command" -ForegroundColor Gray
    Push-Location $WorkingDirectory
    try {
        Invoke-Expression $Command
        Test-CommandSuccess $Command $ErrorMessage
    }
    catch {
        Write-Host "❌ ERROR: $ErrorMessage" -ForegroundColor Red
        Write-Host "Exception: $($_.Exception.Message)" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    finally {
        Pop-Location
    }
}

Write-Host "📦 Publishing Base CMS Monorepo Packages" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra xem có đang ở thư mục scripts không và có thể truy cập root directory
if (-not (Test-Path "..\package.json")) {
    Write-Host "❌ ERROR: Không tìm thấy package.json. Vui lòng chạy script từ thư mục scripts." -ForegroundColor Red
    exit 1
}

# Chuyển về root directory để chạy các lệnh
Set-Location ..

# Build tất cả packages
Write-Host "🔨 Building all packages..." -ForegroundColor Yellow
try {
    Invoke-NpmCommand "npm run build" "." "Build failed! Vui lòng kiểm tra lỗi build trước khi publish."
    Write-Host "✅ Build completed!" -ForegroundColor Green
    Write-Host ""
}
catch {
    Write-Host "❌ CRITICAL ERROR: Build process failed!" -ForegroundColor Red
    Write-Host "Vui lòng sửa lỗi build trước khi tiếp tục publish." -ForegroundColor Red
    exit 1
}

# Publish base-cms-dev trước (vì base-cms depend on nó)
Write-Host "📤 Publishing @libeyondea/base-cms-dev..." -ForegroundColor Yellow

# Kiểm tra xem package base-cms-dev có tồn tại không
if (-not (Test-Path "packages\base-cms-dev\package.json")) {
    Write-Host "❌ ERROR: Không tìm thấy packages\base-cms-dev\package.json" -ForegroundColor Red
    exit 1
}

try {
    # Tăng version patch cho base-cms-dev
    Write-Host "🔢 Updating version for @libeyondea/base-cms-dev..." -ForegroundColor Cyan
    Invoke-NpmCommand "npm version patch --no-git-tag-version" "packages\base-cms-dev" "Version update failed for base-cms-dev!"
    
    # Lấy version mới từ package.json
    $packageJson = Get-Content "packages\base-cms-dev\package.json" | ConvertFrom-Json
    $newVersion = $packageJson.version
    Write-Host "✅ Version updated to: $newVersion" -ForegroundColor Green

    # Publish package
    Write-Host "📦 Publishing @libeyondea/base-cms-dev@$newVersion..." -ForegroundColor Cyan
    Invoke-NpmCommand "npm publish --access public" "packages\base-cms-dev" "Publish failed for base-cms-dev!"
    
    Write-Host "✅ @libeyondea/base-cms-dev@$newVersion published successfully!" -ForegroundColor Green
    Write-Host ""
}
catch {
    Write-Host "❌ CRITICAL ERROR: Failed to publish base-cms-dev!" -ForegroundColor Red
    Write-Host "Exception: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Đợi một chút để package được sync
Write-Host "⏳ Waiting for package to sync..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Write-Host ""

# Publish base-cms
Write-Host "📤 Publishing @libeyondea/base-cms..." -ForegroundColor Yellow

# Kiểm tra xem package base-cms có tồn tại không
if (-not (Test-Path "packages\base-cms\package.json")) {
    Write-Host "❌ ERROR: Không tìm thấy packages\base-cms\package.json" -ForegroundColor Red
    exit 1
}

try {
    # Tăng version patch cho base-cms
    Write-Host "🔢 Updating version for @libeyondea/base-cms..." -ForegroundColor Cyan
    Invoke-NpmCommand "npm version patch --no-git-tag-version" "packages\base-cms" "Version update failed for base-cms!"
    
    # Lấy version mới từ package.json
    $packageJson = Get-Content "packages\base-cms\package.json" | ConvertFrom-Json
    $newVersion = $packageJson.version
    Write-Host "✅ Version updated to: $newVersion" -ForegroundColor Green

    # Publish package
    Write-Host "📦 Publishing @libeyondea/base-cms@$newVersion..." -ForegroundColor Cyan
    Invoke-NpmCommand "npm publish --access public" "packages\base-cms" "Publish failed for base-cms!"
    
    Write-Host "✅ @libeyondea/base-cms@$newVersion published successfully!" -ForegroundColor Green
    Write-Host ""
}
catch {
    Write-Host "❌ CRITICAL ERROR: Failed to publish base-cms!" -ForegroundColor Red
    Write-Host "Exception: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Lấy version cuối cùng của cả 2 packages để hiển thị
try {
    $devPackageJson = Get-Content "packages\base-cms-dev\package.json" | ConvertFrom-Json
    $mainPackageJson = Get-Content "packages\base-cms\package.json" | ConvertFrom-Json
    
    Write-Host "🎉 All packages published successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Published packages with new versions:" -ForegroundColor White
    Write-Host "  - @libeyondea/base-cms-dev@$($devPackageJson.version)" -ForegroundColor Gray
    Write-Host "  - @libeyondea/base-cms@$($mainPackageJson.version)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "💡 Note: Both packages have been automatically patched to new versions!" -ForegroundColor Cyan
}
catch {
    Write-Host "⚠️  WARNING: Could not retrieve final version information" -ForegroundColor Yellow
    Write-Host "Published packages with new versions:" -ForegroundColor White
    Write-Host "  - @libeyondea/base-cms-dev (version updated)" -ForegroundColor Gray
    Write-Host "  - @libeyondea/base-cms (version updated)" -ForegroundColor Gray
}

