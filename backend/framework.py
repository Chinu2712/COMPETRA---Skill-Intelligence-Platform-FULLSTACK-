"""
COMPETRA Backend Application
Skill Intelligence Platform for Official Statistics

Module: Main Application
Purpose: FastAPI application entry point with router configuration
Version: 1.0.0
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import profile, content, quiz

# Initialize FastAPI application
app = FastAPI(
    title="COMPETRA - Skill Intelligence Service",
    description="REST API for skill assessment, learning pathways, and competency mapping",
    version="1.0.0"
)

# Enable CORS middleware for cross-origin frontend requests
# Configuration allows frontend from any origin in development
# Note: Restrict allow_origins in production for security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile.router, prefix="/api/v1/profile", tags=["profile"])
app.include_router(content.router, prefix="/api/v1/content", tags=["content"])
app.include_router(quiz.router, prefix="/api/v1/quiz", tags=["quiz"])

@app.get("/", tags=["health"])
def health_check():
    """
    Health check endpoint
    
    Returns:
        dict: Service status and version information
    """
    return {
        "status": "operational",
        "service": "COMPETRA Skill Intelligence Platform",
        "version": "1.0.0"
    }
