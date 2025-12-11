# PowerShell script để publish các packages theo thứ tự đúng

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("base-cms", "base-cms-dev", "all")]
    [string]$target = "all",
    
    [Parameter(Mandatory=$false)]
    [switch]$help
)

$ErrorActionPreference = "Stop"

# Hiển thị help nếu được yêu cầu
if ($help) {
    Write-Host "📦 Base CMS Publish Script" -ForegroundColor Cyan
    Write-Host "=========================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\publish.ps1 [-target <target>] [-help]" -ForegroundColor White
    Write-Host ""
    Write-Host "Parameters:" -ForegroundColor Yellow
    Write-Host "  -target <target>  Chọn package để publish:" -ForegroundColor Gray
    Write-Host "                   - base-cms     : Chỉ publish @libeyondea/base-cms" -ForegroundColor Gray
    Write-Host "                   - base-cms-dev : Chỉ publish @libeyondea/base-cms-dev" -ForegroundColor Gray
    Write-Host "                   - all          : Publish cả hai packages (mặc định)" -ForegroundColor Gray
    Write-Host "  -help            Hiển thị thông tin này" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\publish.ps1                           # Publish cả hai packages" -ForegroundColor Gray
    Write-Host "  .\publish.ps1 -target base-cms          # Chỉ publish base-cms" -ForegroundColor Gray
    Write-Host "  .\publish.ps1 -target base-cms-dev      # Chỉ publish base-cms-dev" -ForegroundColor Gray
    Write-Host "  .\publish.ps1 -help                     # Hiển thị help" -ForegroundColor Gray
    Write-Host ""
    exit 0
}

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

# Function để publish base-cms-dev
function Publish-BaseCmsDev {
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
        return $newVersion
    }
    catch {
        Write-Host "❌ CRITICAL ERROR: Failed to publish base-cms-dev!" -ForegroundColor Red
        Write-Host "Exception: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Function để publish base-cms
function Publish-BaseCms {
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
        return $newVersion
    }
    catch {
        Write-Host "❌ CRITICAL ERROR: Failed to publish base-cms!" -ForegroundColor Red
        Write-Host "Exception: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Hiển thị thông tin target được chọn
Write-Host "📦 Publishing Base CMS Monorepo Packages" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Target: $target" -ForegroundColor Yellow
Write-Host ""

# Kiểm tra và chuyển về root directory nếu cần
if (Test-Path "package.json") {
    # Đã ở root directory
    Write-Host "📍 Running from root directory" -ForegroundColor Gray
} elseif (Test-Path "..\package.json") {
    # Đang ở thư mục scripts, chuyển về root
    Write-Host "📍 Running from scripts directory, switching to root..." -ForegroundColor Gray
    Set-Location ..
} else {
    Write-Host "❌ ERROR: Không tìm thấy package.json. Vui lòng chạy script từ root directory hoặc thư mục scripts." -ForegroundColor Red
    exit 1
}

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

# Khởi tạo biến để lưu versions
$devVersion = $null
$mainVersion = $null

# Xử lý publish dựa trên target
switch ($target) {
    "base-cms-dev" {
        $devVersion = Publish-BaseCmsDev
    }
    "base-cms" {
        $mainVersion = Publish-BaseCms
    }
    "all" {
        # Publish base-cms-dev trước (vì base-cms depend on nó)
        $devVersion = Publish-BaseCmsDev
        
        # Đợi một chút để package được sync
        Write-Host "⏳ Waiting for package to sync..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Write-Host ""
        
        # Publish base-cms
        $mainVersion = Publish-BaseCms
    }
}

# Hiển thị kết quả cuối cùng
Write-Host "🎉 Publishing completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Hiển thị packages đã được publish
Write-Host "Published packages with new versions:" -ForegroundColor White

if ($devVersion) {
    Write-Host "  - @libeyondea/base-cms-dev@$devVersion" -ForegroundColor Gray
}

if ($mainVersion) {
    Write-Host "  - @libeyondea/base-cms@$mainVersion" -ForegroundColor Gray
}

Write-Host ""

# Hiển thị thông báo phù hợp với target
switch ($target) {
    "base-cms-dev" {
        Write-Host "💡 Note: @libeyondea/base-cms-dev has been automatically patched to new version!" -ForegroundColor Cyan
    }
    "base-cms" {
        Write-Host "💡 Note: @libeyondea/base-cms has been automatically patched to new version!" -ForegroundColor Cyan
        Write-Host "⚠️  WARNING: Make sure @libeyondea/base-cms-dev is up to date before publishing base-cms!" -ForegroundColor Yellow
    }
    "all" {
        Write-Host "💡 Note: Both packages have been automatically patched to new versions!" -ForegroundColor Cyan
    }
}

