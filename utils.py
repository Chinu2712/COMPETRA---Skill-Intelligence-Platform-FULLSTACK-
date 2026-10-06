# utils.py
import os
from pathlib import Path
import json
import openai
from dotenv import load_dotenv
from typing import List

load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
if OPENAI_KEY:
    openai.api_key = OPENAI_KEY

# Simple text extraction
def extract_text_from_file(path: Path) -> str:
    ext = path.suffix.lower()
    if ext == ".txt":
        return path.read_text(encoding="utf-8", errors="ignore")
    if ext == ".docx":
        from docx import Document
        doc = Document(path)
        return "\n".join(p.text for p in doc.paragraphs)
    if ext == ".pdf":
        from pdfminer.high_level import extract_text
        return extract_text(str(path))
    raise ValueError("Unsupported file type")

def chunk_text(text: str, chunk_size: int = 300, overlap: int = 50) -> List[str]:
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i:i+chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks

# Very small embedding store for retrieval (in-memory)
class SimpleEmbedStore:
    def __init__(self):
        self.store = []  # list of dicts: {"content_id","chunk_id","text"}
    def add_content(self, content_id, chunks):
        for i, c in enumerate(chunks):
            self.store.append({"content_id": content_id, "chunk_id": f"{content_id}_{i}", "text": c})
    def get_chunks_for_content(self, content_id):
        return [s["text"] for s in self.store if s["content_id"] == content_id]
    def retrieve_similar(self, query, top_k=3):
        # naive: return first top_k chunks containing any query word
        qwords = set(query.lower().split())
        scored = []
        for s in self.store:
            score = len(qwords.intersection(set(s["text"].lower().split())))
            scored.append((score, s))
        scored.sort(reverse=True, key=lambda x: x[0])
        return [s for score, s in scored[:top_k]]

EMBED_STORE = SimpleEmbedStore()

# LLM call wrapper (OpenAI ChatCompletion)
def call_llm(prompt: str, temperature: float = 0.0, model: str = "gpt-3.5-turbo"):
    if not OPENAI_KEY:
        raise RuntimeError("OpenAI key not configured")
    resp = openai.ChatCompletion.create(
        model=model,
        messages=[{"role":"user","content":prompt}],
        temperature=temperature,
        max_tokens=600
    )
    return resp["choices"][0]["message"]["content"].strip()
