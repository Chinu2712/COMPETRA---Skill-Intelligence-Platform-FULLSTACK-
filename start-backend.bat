@echo off
REM Backend startup script for IGOT Karmayogi (Windows)

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo IGOT Karmayogi Backend Startup
echo ==========================================
echo.

set BACKEND_DIR=%~dp0
set VENV_DIR=%BACKEND_DIR%.venv

REM Check if virtual environment exists
if not exist "%VENV_DIR%" (
    echo 📦 Creating Python virtual environment...
    python -m venv "%VENV_DIR%"
    if errorlevel 1 (
        echo Error: Failed to create virtual environment
        exit /b 1
    )
)

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call "%VENV_DIR%\Scripts\activate.bat"
if errorlevel 1 (
    echo Error: Failed to activate virtual environment
    exit /b 1
)

REM Install dependencies
echo 📚 Installing dependencies...
pip install -q -r "%BACKEND_DIR%libraries.txt"
if errorlevel 1 (
    echo Warning: Some dependencies might not have installed correctly
)

REM Check for .env file
if not exist "%BACKEND_DIR%.env" (
    echo ⚠️  Creating .env file with defaults...
    (
        echo # Copy to .env and set your OpenAI key if you have one
        echo OPENAI_API_KEY=
        echo # Optional: set IGOT_BASE_URL and IGOT_TOKEN when you have credentials
        echo IGOT_BASE_URL=
        echo IGOT_TOKEN=
    ) > "%BACKEND_DIR%.env"
)

REM Start the backend server
echo.
echo ✅ Starting FastAPI server...
echo.
echo    Backend API: http://localhost:8000
echo    API Docs:    http://localhost:8000/docs
echo    ReDoc:       http://localhost:8000/redoc
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%BACKEND_DIR%"
python -m uvicorn framework:app --host 0.0.0.0 --port 8000 --reload

pause
