@echo off
REM Frontend startup script for COMPETRA (Windows)

echo.
echo ==========================================
echo COMPETRA Frontend - Local Development
echo ==========================================
echo.

REM Check if Python's simple HTTP server is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo 🌐 Starting development server...
echo.
echo    Frontend:   http://localhost:8080
echo    Backend:    http://localhost:8000 (make sure it's running)
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
python -m http.server 8080

pause
