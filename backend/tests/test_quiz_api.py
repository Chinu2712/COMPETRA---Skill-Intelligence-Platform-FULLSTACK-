import base64

from fastapi.testclient import TestClient
from framework import app

client = TestClient(app)


def test_quiz_spec_endpoints_round_trip():
    material_payload = {
        "file_name": "survey_design.txt",
        "file_type": "txt",
        "content_base64": base64.b64encode(b"Survey design includes sampling, planning, and statistics.").decode("utf-8"),
        "tags": ["Survey Design", "Sampling", "Statistics"],
    }

    upload_response = client.post("/api/v1/quiz/materials/upload", json=material_payload)
    assert upload_response.status_code == 200, upload_response.text
    material_id = upload_response.json()["material_id"]
    assert upload_response.json()["status"] == "uploaded"

    generate_payload = {
        "material_id": material_id,
        "quiz_type": "MCQ",
        "difficulty": "medium",
        "num_questions": 1,
        "competency_domain": "Statistical Competencies",
        "language": "en",
    }

    generate_response = client.post("/api/v1/quiz/generate", json=generate_payload)
    assert generate_response.status_code == 200, generate_response.text
    quiz_id = generate_response.json()["quiz_id"]
    assert len(generate_response.json()["questions"]) >= 1

    evaluate_payload = {
        "quiz_id": quiz_id,
        "responses": [
            {"question_id": generate_response.json()["questions"][0]["question_id"], "selected_option": generate_response.json()["questions"][0]["options"][0]}
        ],
        "learner_id": "learner_001",
    }

    evaluate_response = client.post("/api/v1/quiz/evaluate", json=evaluate_payload)
    assert evaluate_response.status_code == 200, evaluate_response.text
    assert "score" in evaluate_response.json()
    assert "feedback" in evaluate_response.json()
    assert "competency_gap" in evaluate_response.json()

    recommendations_response = client.get("/api/v1/quiz/recommendations/learner_001")
    assert recommendations_response.status_code == 200, recommendations_response.text
    assert recommendations_response.json()["learner_id"] == "learner_001"
