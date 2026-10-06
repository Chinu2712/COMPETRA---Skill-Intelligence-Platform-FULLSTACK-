"""
Profile Router Module
Handles user profile management, competency assessment, and learning history
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import datetime

router = APIRouter()

# In-memory data store (should be replaced with database in production)
PROFILES = {}

class EducationItem(BaseModel):
    degree: str
    year: Optional[int]

class TrainingItem(BaseModel):
    course_id: str
    source: Optional[str]
    completed_on: Optional[str]

class ProfileIn(BaseModel):
    user_id: str
    name: str
    designation: Optional[str] = None
    department: Optional[str] = None
    job_role: Optional[str] = None
    education: Optional[List[EducationItem]] = []
    experience_years: Optional[float] = 0.0
    previous_trainings: Optional[List[TrainingItem]] = []
    skills: Optional[List[str]] = []

class CompetencyItem(BaseModel):
    id: str
    name: str
    level: float
    target_level: float
    gap: float

class CompetencyProfile(BaseModel):
    user_id: str
    competencies: List[CompetencyItem]
    last_updated: str

@router.post("/", status_code=201)
def create_or_update_profile(profile_data: ProfileIn):
    """
    Create or update user profile
    
    Args:
        profile_data: User profile information
        
    Returns:
        dict: Confirmation with user_id and status
    """
    PROFILES[profile_data.user_id] = profile_data.dict()
    return {
        "status": "success",
        "user_id": profile_data.user_id,
        "message": "Profile created/updated successfully"
    }

@router.get("/{user_id}/competency-profile", response_model=CompetencyProfile)
def get_competency_profile(user_id: str):
    """
    Retrieve competency profile for a user
    
    Args:
        user_id: Unique user identifier
        
    Returns:
        CompetencyProfile: User's competency assessment data
        
    Raises:
        HTTPException: 404 if user profile not found
    """
    if user_id not in PROFILES:
        raise HTTPException(status_code=404, detail="User profile not found")
    
    profile = PROFILES[user_id]
    skills = set([skill.lower() for skill in profile.get("skills", [])])
    all_competencies = [
        ("STAT_SURVEY_DESIGN","Survey Design"),
        ("PYTHON","Python"),
        ("SQL","SQL"),
        ("AI_ML","AI/ML"),
        ("DATA_VIZ","Data Visualization"),
    ]
    comps = []
    for cid, name in all_competencies:
        level = 1.0
        if name.lower() in skills or cid.lower() in skills:
            level = 3.0
        target = 4.0
        gap = round(target - level, 2)
        comps.append({"id":cid,"name":name,"level":level,"target_level":target,"gap":gap})
    return {"user_id":user_id,"competencies":comps,"last_updated":datetime.datetime.utcnow().isoformat()}
