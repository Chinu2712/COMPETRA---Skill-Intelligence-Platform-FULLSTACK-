# COMPETRA Backend API

**Skill Intelligence Platform** | REST API Server

FastAPI-based backend service providing APIs for skill assessment, content management, quiz generation, and user profile management.

## 🎯 Overview

This backend service powers the COMPETRA skill intelligence platform, offering:
- User profile and competency management
- Content upload and processing
- Quiz generation and evaluation
- Learning recommendations
- Assessment analytics

## 🛠 Technology Stack

- **Framework**: FastAPI 0.104+
- **Server**: Uvicorn 0.24+
- **Language**: Python 3.8+
- **Data Validation**: Pydantic 2.4+
- **Documentation**: OpenAPI/Swagger

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Setup

1. Open a terminal in this backend project directory:
```bash
cd "i g o t karmayogi/igot-protoype"
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file if your deployment requires environment-specific
   configuration, using the variables listed in the Configuration section.

## 🚀 Quick Start

### Development Server
```bash
python -m uvicorn framework:app --reload --host 0.0.0.0 --port 8000
```

### Production Server
```bash
python -m uvicorn framework:app --host 0.0.0.0 --port 8000 --workers 4
```

### Access API
- **API Docs (Swagger)**: http://localhost:8000/docs
- **ReDoc Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/

## 📚 API Endpoints

### Profile Management (`/api/v1/profile`)
```
POST /api/v1/profile/
  Create or update user profile
  
GET /api/v1/profile/{user_id}
  Retrieve user profile
  
GET /api/v1/profile/{user_id}/competency-profile
  Get user's competency assessment
```

### Content Management (`/api/v1/content`)
```
POST /api/v1/content/upload
  Upload learning content (PDF, DOCX, TXT)
  
GET /api/v1/content/{content_id}
  Retrieve content details
```

### Quiz Management (`/api/v1/quiz`)
```
POST /api/v1/quiz/generate
  Generate quiz from content or custom text
  
POST /api/v1/quiz/evaluate
  Evaluate quiz responses and provide feedback
```

## 📋 Project Structure

```
backend/
├── framework.py            # Main FastAPI application
├── router/
│   ├── __init__.py         # Router package initialization
│   ├── profile.py          # Profile management endpoints
│   ├── content.py          # Content handling endpoints
│   └── quiz.py             # Quiz generation and evaluation
├── utils.py                # Utility functions
├── igot_adaptor.py         # IGOT integration adapter
├── requirements.txt        # Python dependencies
├── tests/
│   └── test_quiz_api.py    # Quiz API tests
├── .gitignore              # Git configuration
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the settings required by your deployment:
```env
# Backend Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# API Keys
OPENAI_API_KEY=your_openai_key_here
IGOT_BASE_URL=https://api.igot.com
IGOT_TOKEN=your_igot_token_here

# Database (if using)
DATABASE_URL=sqlite:///./competra.db

# CORS
ALLOWED_ORIGINS=http://localhost:8080,https://yourdomain.com
```

## 📝 Models

### Profile Model
```python
{
  "user_id": "string",
  "name": "string",
  "designation": "string",
  "department": "string",
  "job_role": "string",
  "education": [...],
  "experience_years": 5.0,
  "skills": ["Python", "Data Analysis", ...],
  "previous_trainings": [...]
}
```

### Competency Profile Model
```python
{
  "user_id": "string",
  "competencies": [
    {
      "id": "string",
      "name": "string",
      "level": 75.0,
      "target_level": 85.0,
      "gap": 10.0
    }
  ],
  "last_updated": "2024-01-01T00:00:00Z"
}
```

## 🔄 CORS Configuration

CORS is enabled for frontend communication:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🧪 Testing

### Run Tests
```bash
pytest
```

### Run the available API test
```bash
pytest tests/test_quiz_api.py
```

### With Coverage
```bash
pytest --cov=router --cov-report=html
```

## 📊 Data Storage

Currently uses in-memory storage for development. For production:
- Replace with PostgreSQL
- Add database migrations
- Implement caching (Redis)

## 🔐 Security

- API authentication (JWT planned)
- Input validation with Pydantic
- SQL injection prevention (when using database)
- CORS configuration for production
- Rate limiting recommended
- Keep `.env` files and all API keys out of source control

## 🚀 Deployment

### Docker (Recommended)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "framework:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Cloud Platforms
- **Render**: Deploy the FastAPI application with the command shown above
- **Railway**: Supports Python natively
- **AWS**: EC2 or Lambda + API Gateway
- **DigitalOcean**: App Platform or Droplets

## 📈 Performance Optimization

- Use connection pooling for databases
- Enable response compression
- Implement caching for frequently accessed data
- Use async/await for I/O operations
- Monitor with tools like Prometheus

## 🐛 Troubleshooting

### Module Not Found
```bash
pip install -r requirements.txt
```

### Port Already in Use
```bash
# Change port
python -m uvicorn framework:app --port 8001
```

### CORS Errors
- Check frontend URL in ALLOWED_ORIGINS
- Verify browser is not blocking requests
- Check if API is responding to health check

## 📚 Additional Resources

- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **Pydantic Documentation**: https://docs.pydantic.dev/
- **Uvicorn Documentation**: https://www.uvicorn.org/
- **OpenAPI Specification**: https://spec.openapis.org/

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open Pull Request

## 📄 License

MIT License - See the `LICENSE` file in the parent backend project directory
when using the current local folder layout.

## 👥 Support

For issues or questions:
1. Check API documentation at `/docs`
2. Review error logs
3. Create issue on GitHub with:
   - Error message
   - Request/Response details
   - Python version and OS

## 🔗 Related Links

- **Frontend Repository**: [COMPETRA Frontend](https://github.com/Chinu2712/competra)
- **API Documentation**: http://localhost:8000/docs (when running)
- **Issue Tracker**: https://github.com/Chinu2712/competra/issues

---

**Built with FastAPI for Skill Intelligence**
