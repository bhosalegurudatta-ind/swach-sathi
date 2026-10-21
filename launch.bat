@echo off
title Swachh Sathi - Smart Waste Ecosystem Launcher
color 0A

echo ==============================================================
echo       SWACHH SATHI - ALANDI SMART CIVIC WASTE ECOSYSTEM
echo ==============================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking MongoDB connection...
net start MongoDB >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo   - MongoDB service is running.
) else (
    echo   - Note: MongoDB service already active or running as process.
)

echo.
echo [2/3] Checking Server status...
netstat -ano | findstr :5000 >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo   - Backend server is ALREADY RUNNING on port 5000.
) else (
    echo   - Starting Swachh Sathi server on http://localhost:5000 ...
    start "Swachh Sathi Server" /min cmd /c "node backend/server.js"
    timeout /t 3 /nobreak >nul
)

echo.
echo [3/3] Opening Swachh Sathi in your default browser...
start "" "http://localhost:5000"

echo.
echo ==============================================================
echo  Web Application launched successfully!
echo.
echo  - Main Website:   http://localhost:5000
echo  - Citizen Login:  http://localhost:5000/dashboard.html
echo  - Admin Panel:    http://localhost:5000/admin.html
echo  - Backup Port:    http://localhost:3000
echo ==============================================================
echo.
pause
