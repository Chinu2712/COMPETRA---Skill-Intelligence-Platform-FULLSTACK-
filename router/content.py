"""
Content Router Module
Handles content management, file uploads, and text processing
"""

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from pathlib import Path
import uuid
import shutil
from utils import extract_text_from_file, chunk_text, EMBED_STORE

router = APIRouter()

# File upload configuration
UPLOAD_DIR = Path("./uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# In-memory content storage (should be replaced with database in production)
# Structure: content_id -> {"title": str, "text": str, "chunks": list}
CONTENT_STORE = {}

class UploadResponse(BaseModel):
    content_id: str
    status: str

@router.post("/upload", response_model=UploadResponse)
async def upload_content(file: UploadFile = File(...), title: str = Form(...), uploader_id: str = Form(None)):
    """
    Upload and process content file
    
    Args:
        file: File to upload (supported: .txt, .pdf, .docx)
        title: Content title for identification
        uploader_id: Optional identifier for the uploader
        
    Returns:
        UploadResponse: Content ID and upload status
        
    Raises:
        HTTPException: 400 if unsupported file type
    """
    ext = Path(file.filename).suffix.lower()
    supported_types = [".txt", ".pdf", ".docx"]
    
    if ext not in supported_types:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Supported formats: {', '.join(supported_types)}"
        )
    
    content_id = str(uuid.uuid4())
    output_path = UPLOAD_DIR / f"{content_id}{ext}"
    
    # Save uploaded file
    with open(output_path, "wb") as output_file:
        shutil.copyfileobj(file.file, output_file)
    
    # Extract and process text
    try:
        text = extract_text_from_file(output_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {e}")
    chunks = chunk_text(text, chunk_size=200, overlap=40)
    CONTENT_STORE[content_id] = {"title": title, "text": text, "chunks": chunks, "uploader_id": uploader_id}
    # Optionally add to embedding store (simple list) for retrieval
    EMBED_STORE.add_content(content_id, chunks)
    return {"content_id": content_id, "status": "ingested"}

@router.get("/{content_id}")
def get_content(content_id: str):
    if content_id not in CONTENT_STORE:
        raise HTTPException(status_code=404, detail="Content not found")
    c = CONTENT_STORE[content_id]
    return {"content_id": content_id, "title": c["title"], "num_chunks": len(c["chunks"])}
