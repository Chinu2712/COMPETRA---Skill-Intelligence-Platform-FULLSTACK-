"""
Quiz Router Module
Handles quiz generation, material management, and assessment evaluation
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid
import json
import base64
from utils import call_llm, EMBED_STORE

router = APIRouter()

# In-memory data stores (replace with database in production)
MATERIAL_STORE = {}  # material_id -> material data
QUIZ_STORE = {}      # quiz_id -> quiz questions and metadata


class UploadMaterialRequest(BaseModel):
    file_name: str
    file_type: str
    content_base64: str
    tags: Optional[List[str]] = []


class GenerateRequest(BaseModel):
    material_id: Optional[str] = None
    content_id: Optional[str] = None
    text: Optional[str] = None
    quiz_type: str = "MCQ"
    difficulty: str = "medium"
    num_questions: int = 5
    competency_domain: str = "General Competencies"
    language: str = "en"
    user_id: Optional[str] = None
    learner_id: Optional[str] = None


class EvaluateResponseItem(BaseModel):
    question_id: str
    selected_option: str


class EvaluateRequest(BaseModel):
    quiz_id: str
    responses: List[EvaluateResponseItem]
    learner_id: Optional[str] = None


@router.post("/materials/upload")
def upload_material(req: UploadMaterialRequest):
    try:
        decoded = base64.b64decode(req.content_base64)
        content_text = decoded.decode("utf-8", errors="ignore")
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Invalid base64 content: {exc}")

    material_id = f"mat_{uuid.uuid4()}"
    MATERIAL_STORE[material_id] = {
        "material_id": material_id,
        "file_name": req.file_name,
        "file_type": req.file_type,
        "content": content_text,
        "tags": req.tags or [],
    }

    return {"material_id": material_id, "status": "uploaded"}


@router.post("/generate")
def generate_quiz(req: GenerateRequest):
    if not req.material_id and not req.content_id and not req.text:
        raise HTTPException(status_code=400, detail="Provide material_id, content_id or text")

    chunks = []
    if req.material_id:
        material = MATERIAL_STORE.get(req.material_id)
        if not material:
            raise HTTPException(status_code=404, detail="Material not found")
        from utils import chunk_text
        chunks = chunk_text(material["content"], chunk_size=200, overlap=40)
    elif req.content_id:
        chunks = EMBED_STORE.get_chunks_for_content(req.content_id)
        if not chunks:
            raise HTTPException(status_code=404, detail="No content/chunks found for content_id")
    else:
        chunks = [req.text]

    limit = max(1, req.num_questions or 1)
    selected = chunks[: min(len(chunks), limit)]

    questions = []
    for index, chunk in enumerate(selected):
        prompt = f"""Generate one multiple-choice question from the material below. Return JSON with keys: question_text, options (list of four strings), correct_answer, explanation.

Content:
{chunk}

Return only JSON.
"""

        parsed = {
            "question_text": f"Core concept question {index + 1}",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_answer": "Option A",
            "explanation": "The generated fallback question is based on the available material.",
        }
        try:
            llm_out = call_llm(prompt, temperature=0.0)
            parsed = json.loads(llm_out)
        except Exception:
            pass

        q_text = parsed.get("question_text") or parsed.get("stem") or f"Learning concept question {index + 1}"
        options = parsed.get("options") or ["Option A", "Option B", "Option C", "Option D"]
        if len(options) < 4:
            options = options + ["Option D"] * (4 - len(options))
        correct_answer = parsed.get("correct_answer") or parsed.get("correct") or options[0]
        explanation = parsed.get("explanation") or ""

        qid = str(uuid.uuid4())
        questions.append({
            "question_id": qid,
            "question_text": q_text,
            "options": options[:4],
            "correct_answer": correct_answer,
            "explanation": explanation,
            "difficulty": req.difficulty,
            "competency_domain": req.competency_domain,
            "language": req.language,
        })

    quiz_id = f"quiz_{uuid.uuid4()}"
    QUIZ_STORE[quiz_id] = {
        "quiz_id": quiz_id,
        "questions": questions,
        "user_id": req.user_id,
        "learner_id": req.learner_id,
        "quiz_type": req.quiz_type,
        "difficulty": req.difficulty,
        "competency_domain": req.competency_domain,
        "language": req.language,
    }
    return {"quiz_id": quiz_id, "questions": questions}


@router.post("/evaluate")
def evaluate_quiz(req: EvaluateRequest):
    if req.quiz_id not in QUIZ_STORE:
        raise HTTPException(status_code=404, detail="Quiz not found")

    quiz = QUIZ_STORE[req.quiz_id]
    questions = quiz.get("questions", [])
    question_by_id = {q["question_id"]: q for q in questions}

    feedback = []
    correct_count = 0
    for response in req.responses:
        question = question_by_id.get(response.question_id)
        if not question:
            continue

        is_correct = question.get("correct_answer") == response.selected_option
        if is_correct:
            correct_count += 1

        feedback.append({
            "question_id": response.question_id,
            "is_correct": is_correct,
            "correct_answer": question.get("correct_answer"),
            "explanation": question.get("explanation", ""),
        })

    competency_gap = []
    if quiz.get("competency_domain"):
        competency_gap.append(quiz["competency_domain"])

    return {
        "score": correct_count,
        "feedback": feedback,
        "competency_gap": competency_gap,
    }


@router.get("/recommendations/{learner_id}")
def get_recommendations(learner_id: str):
    courses = [
        {
            "course_id": "igot_202",
            "title": "Advanced Sampling Techniques",
            "url": "https://igot.gov.in/course/202",
        },
        {
            "course_id": "igot_401",
            "title": "Applied Statistical Competencies",
            "url": "https://igot.gov.in/course/401",
        },
    ]
    return {"learner_id": learner_id, "recommended_courses": courses}


@router.get("/{quiz_id}", response_model=dict)
def get_quiz(quiz_id: str):
    if quiz_id not in QUIZ_STORE:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return QUIZ_STORE[quiz_id]
