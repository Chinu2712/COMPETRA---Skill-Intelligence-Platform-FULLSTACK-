#!/bin/bash
# Backend startup script for IGOT Karmayogi

set -e

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$BACKEND_DIR/.venv"

echo "=========================================="
echo "IGOT Karmayogi Backend Startup"
echo "=========================================="
echo ""

# Check if virtual environment exists
if [ ! -d "$VENV_DIR" ]; then
    echo "📦 Creating Python virtual environment..."
    python -m venv "$VENV_DIR"
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# Install dependencies
echo "📚 Installing dependencies..."
pip install -q -r libraries.txt

# Check for .env file
if [ ! -f "$BACKEND_DIR/.env" ]; then
    echo "⚠️  No .env file found. Creating one with defaults..."
    cp "$BACKEND_DIR/.env" "$BACKEND_DIR/.env" 2>/dev/null || {
        cat > "$BACKEND_DIR/.env" << EOF
OPENAI_API_KEY=
IGOT_BASE_URL=
IGOT_TOKEN=
EOF
    }
fi

# Start the backend server
echo ""
echo "✅ Starting FastAPI server..."
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo "   ReDoc: http://localhost:8000/redoc"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$BACKEND_DIR"
uvicorn framework:app --host 0.0.0.0 --port 8000 --reload
