@echo off
setlocal enabledelayedexpansion

echo ==================================================
echo   Swachh Sathi Smart Waste Ecosystem Startup
echo ==================================================
echo.

:: Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! 
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo [1/3] Checking dependencies...
if not exist "node_modules\" (
    echo Installing root dependencies...
    call npm install
)
if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend && call npm install && cd ..
)

:: Reuse an already running app instead of starting a duplicate server
netstat -ano | findstr ":5000" | findstr "LISTENING" >nul
if %errorlevel% equ 0 (
    echo [INFO] Swachh Sathi is already running on port 5000.
    start http://localhost:5000
    exit /b 0
)

echo.
echo [3/3] Finalizing Setup...
:: Start the browser after a short delay
start /b cmd /c "timeout /t 3 >nul && start http://localhost:5000"

:: Start the server
npm start

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server failed to start.
    echo Please check if Port 5000 is already in use.
    pause
)

pause
