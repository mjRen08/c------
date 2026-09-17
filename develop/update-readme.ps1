# Convert the UTF-8 intermediate file produced by update-readme.mjs into GBK
# for README.txt. Node has no GBK encoder, so .NET does the conversion here.
# NOTE: this file is intentionally ASCII-only. Windows PowerShell 5.1 reads
# .ps1 as ANSI unless it has a BOM, so Chinese literals here would break parsing.
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$tmp = Join-Path $here '..\README.txt.utf8.tmp'
$out = Join-Path $here '..\README.txt'

if (-not (Test-Path $tmp)) {
    Write-Host "intermediate file not found: $tmp  (run: node update-readme.mjs first)"
    exit 1
}

$text = [System.IO.File]::ReadAllText($tmp, [System.Text.Encoding]::UTF8)
$gbk = [System.Text.Encoding]::GetEncoding(936)
[System.IO.File]::WriteAllText($out, $text, $gbk)
Remove-Item $tmp -Force

$bytes = (Get-Item $out).Length
# read back with GBK and check the two markers we just inserted
$check = [System.IO.File]::ReadAllText($out, $gbk)
$marker1 = [char]0x6709 + [char]0x4E09 + [char]0x6837            # "you san yang"
$marker2 = 'develop/data/batch-'
$ok = $check.Contains($marker1) -and $check.Contains($marker2)
Write-Host "README.txt rewritten as GBK: $bytes bytes, marker check $(if ($ok) { 'PASS' } else { 'FAIL' })"
if (-not $ok) { exit 1 }
