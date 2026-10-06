from typing import Iterable, List, Optional


def map_tags_to_competencies(tags: Iterable[str]) -> List[str]:
    mapping = {
        "survey": ["STAT_SURVEY_DESIGN"],
        "python": ["PYTHON"],
        "data-visualization": ["DATA_VIZ"],
    }

    competencies: List[str] = []
    for tag in tags:
        competencies.extend(mapping.get(tag.lower(), []))
    return list(dict.fromkeys(competencies))


class IGOTAdapter:
    def __init__(self, base_url: Optional[str] = None, token: Optional[str] = None):
        self.base_url = base_url
        self.token = token

    def sync_courses(self):
        return [
            {
                "course_id": "igot-101",
                "title": "Survey Design Basics",
                "tags": ["survey"],
                "mapped_competencies": ["STAT_SURVEY_DESIGN"],
            },
            {
                "course_id": "igot-201",
                "title": "Intro to Python",
                "tags": ["python"],
                "mapped_competencies": ["PYTHON"],
            },
        ]

    def enroll_user(self, user_id, course_id):
        return True

    def get_user_completion(self, user_id):
        return []
