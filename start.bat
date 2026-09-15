@echo off
chcp 65001 >nul
title CodeMaster 启动器
color 0B

echo.
echo ╔══════════════════════════════════════════════════╗
echo ║                                                  ║
echo ║          CodeMaster  C 语言学习平台              ║
echo ║              一键启动脚本                        ║
echo ║                                                  ║
echo ╚══════════════════════════════════════════════════╝
echo.

REM ============ 1. 切换到脚本所在目录 ============
cd /d "%~dp0"
echo [1/4] 当前目录：%cd%
echo.

REM ============ 2. 检查 Node.js 是否安装 ============
echo [2/4] 检查 Node.js 环境...
where node >nul 2>nul
if errorlevel 1 (
    color 0C
    echo.
    echo  ? 未检测到 Node.js！
    echo.
    echo  请先安装 Node.js 后再运行本脚本：
    echo    https://nodejs.org
    echo.
    echo  安装时选择 LTS 版本，一路"下一步"即可。
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo  ? 已检测到 Node.js %NODE_VER%
echo.

REM ============ 3. 检查必需文件是否齐全 ============
echo [3/4] 检查项目文件...
if not exist "server.js" (
    color 0C
    echo.
    echo  ? 找不到 server.js！
    echo  请确保 start.bat 和 server.js 放在同一个目录下。
    echo.
    pause
    exit /b 1
)
if not exist ".env" (
    color 0E
    echo.
    echo  ? 警告：找不到 .env 文件
    echo  AI 助手将无法使用（其他功能正常）。
    echo  如需 AI 功能，请创建 .env 并填入：
    echo      DEEPSEEK_API_KEY=sk-你的密钥
    echo      PORT=3000
    echo.
    timeout /t 3 >nul
) else (
    echo  ? 找到 .env 文件
)
echo  ? 找到 server.js
echo.

REM ============ 4. 启动服务器 ============
echo [4/4] 正在启动服务...
echo.
echo  ┌────────────────────────────────────────────┐
echo  │  启动后浏览器将自动打开：                  │
echo  │     http://localhost:3000                  │
echo  │                                            │
echo  │  关闭服务：按 Ctrl + C                     │
echo  │  或直接关闭本窗口                          │
echo  └────────────────────────────────────────────┘
echo.

REM 延迟 2 秒后自动打开浏览器（给 Node 一点启动时间）
start "" cmd /c "timeout /t 2 >nul & start http://localhost:3000"

REM 前台启动 Node 服务
node server.js

REM ============ 服务退出后的处理 ============
echo.
echo.
echo  服务已停止。
echo.
pause