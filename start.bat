@echo off
REM ============================================================
REM  CodeMaster - one-click launcher
REM ------------------------------------------------------------
REM  This file is ASCII-only ON PURPOSE.
REM  cmd.exe decodes .bat files with the system OEM code page, so
REM  non-ASCII text inside a .bat turns into garbage on machines
REM  whose locale differs from yours (and a "chcp" line inside the
REM  file does not reliably fix it - it can even corrupt parsing).
REM  English text here means it looks the same on every Windows.
REM  Chinese instructions: README.txt
REM ============================================================
title CodeMaster - C Language Learning Platform
color 0B

echo.
echo  ====================================================
echo    CodeMaster  -  C Language Learning Platform
echo  ====================================================
echo.

REM ---------- 1. switch to this script's folder ----------
cd /d "%~dp0"
echo  [1/4] Working directory: %cd%
echo.

REM ---------- 2. check Node.js ----------
echo  [2/4] Checking Node.js ...
where node >nul 2>nul
if errorlevel 1 (
    color 0C
    echo.
    echo   [X] Node.js not found.
    echo.
    echo       Please install Node.js 18 or newer first:
    echo         https://nodejs.org
    echo.
    echo       Download the LTS version, keep the default options
    echo       while installing, then run start.bat again.
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo   [OK] Node.js %NODE_VER%
echo.

REM ---------- 3. check the project files ----------
echo  [3/4] Checking project files ...
if not exist "server.js" (
    color 0C
    echo.
    echo   [X] server.js not found.
    echo       Keep start.bat in the same folder as server.js.
    echo.
    pause
    exit /b 1
)
if not exist ".env" (
    color 0E
    echo.
    echo   [!] .env not found.
    echo       The AI assistant needs an API key there, e.g.
    echo           DEEPSEEK_API_KEY=sk-xxxxxx
    echo           PORT=3000
    echo       Everything else still works without it.
    echo.
    timeout /t 3 >nul
) else (
    echo   [OK] .env found
)
echo   [OK] server.js found
echo.

REM ---------- 4. start the server ----------
echo  [4/4] Starting the local server ...
echo.
echo  ====================================================
echo    This PC  :  http://localhost:3000
echo    Phone    :  use the "phone" address printed below
echo                (phone and PC must share one Wi-Fi)
echo.
echo    Press Ctrl + C to stop the server
echo  ====================================================
echo.

REM give the server a moment, then open the browser
start "" cmd /c "timeout /t 2 >nul & start http://localhost:3000"

REM run the server in this window so it stays visible
node server.js

REM ---------- reached only after the server stops ----------
echo.
echo.
echo  Server stopped. You can close this window.
echo.
pause
