# auto-commit.ps1
# Tự động stage và commit khi có thay đổi trong source code EduMart.
# Chạy: .\auto-commit.ps1
# Chạy nền: Start-Process powershell "-NoExit -File auto-commit.ps1" -WindowStyle Minimized

param([int]$Seconds = 3)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Test-Path (Join-Path $root ".git"))) {
    Write-Host "Loi: Khong phai git repository." -ForegroundColor Red; exit 1
}

Write-Host ""
Write-Host "  EduMart Auto-Commit " -ForegroundColor Cyan -NoNewline
Write-Host "(chu ky: ${Seconds}s | Ctrl+C de dung)" -ForegroundColor Gray
Write-Host "  Thu muc: $root`n" -ForegroundColor Gray

while ($true) {
    Start-Sleep -Seconds $Seconds

    # Stage toan bo source (index.html + public/)
    git -C $root add index.html public/ 2>$null

    # Lay danh sach file da stage
    $staged = git -C $root diff --cached --name-only 2>$null
    if (-not $staged) { continue }

    # Tao commit message
    $files  = $staged | ForEach-Object { Split-Path $_ -Leaf }
    $label  = ($files | Select-Object -First 3) -join ", "
    if ($files.Count -gt 3) { $label += " +$($files.Count - 3) files" }
    $ts     = Get-Date -Format "HH:mm:ss"
    $msg    = "auto [$ts]: $label"

    git -C $root commit -m $msg 2>$null
    Write-Host "  [$ts] OK  $label" -ForegroundColor Green
}
