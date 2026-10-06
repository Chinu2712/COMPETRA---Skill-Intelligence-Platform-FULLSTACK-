# COMPETRA - Skill Intelligence Platform

**Frontend Application** | Skill Assessment & Learning Management System

A modern, responsive web application for skill assessment, competency mapping, and personalized learning pathways for official statistics professionals.

## 🎯 Features

- **User Profile Management**: Multi-user support with dynamic profile switching
- **Dashboard Analytics**: Real-time metrics and performance tracking
- **Competency Assessment**: Comprehensive competency mapping and analysis
- **Learning Pathways**: Personalized learning path recommendations
- **Dark Mode**: Theme switching with persistent user preferences
- **Responsive Design**: Optimized for desktop and tablet devices
- **Backend Integration**: RESTful API integration with FastAPI backend

## 🛠 Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid layouts
- **JavaScript**: Vanilla JS (no dependencies) for dynamic interactivity
- **API Integration**: Fetch API for backend communication

## 📁 Project Structure

```
igot karma/
├── index.html              # Main application entry point
├── app.js                  # Core application logic
├── styles.css              # Main stylesheet (includes design tokens)
├── api-client.js           # Backend API integration layer
├── LICENSE                 # MIT license
├── .gitignore              # Git configuration
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. Open a terminal in the frontend project directory:
```bash
cd "igot karma"
```

2. Start the frontend development server:
```bash
python -m http.server 8080
```

3. Open in browser:
```
http://localhost:8080/index.html
```

### Backend Setup
For full functionality, ensure the backend API is running:
```bash
cd "i g o t karmayogi/igot-protoype"
pip install -r requirements.txt
python -m uvicorn framework:app --reload --port 8000
```

## 📖 Usage

### Profile Switching
- Click the profile dropdown (top-right corner)
- Select a different user profile
- Dashboard updates automatically with profile-specific data

### Dark Mode
- Click the moon/sun icon (🌙/☀️) in the top navigation
- Preference is saved to browser storage

### Navigation
- Use the sidebar navigation to switch between sections:
  - **Overview**: Dashboard with key metrics
  - **My Pathways**: Learning pathways and courses
  - **Competencies**: Competency assessment results
  - **Assessment Studio**: Quiz and assessment tools

## 🎨 Customization

### Colors and Theme
Edit `styles.css` to modify:
- Primary colors (CSS variables at top of file)
- Typography scale
- Spacing system
- Component colors

### Dark Mode Colors
Modify dark mode rules in `styles.css` (search for `.dark-mode` class)

## 🔌 API Integration

The application communicates with the backend API:
- Base URL: `http://localhost:8000`
- See `api-client.js` for API methods

### Available Endpoints
- `GET /api/v1/profile/{user_id}` - Get user profile
- `POST /api/v1/profile/` - Create/update profile
- `GET /api/v1/profile/{user_id}/competency-profile` - Get competency profile
- `POST /api/v1/content/upload` - Upload learning content
- `GET /api/v1/content/{content_id}` - Get content details
- `POST /api/v1/quiz/materials/upload` - Upload quiz material
- `POST /api/v1/quiz/generate` - Generate a quiz
- `POST /api/v1/quiz/evaluate` - Evaluate quiz responses
- `GET /api/v1/quiz/recommendations/{learner_id}` - Get learning recommendations

## 🧪 Testing

Currently uses manual testing. Future test suite coming soon.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ⚙️ Configuration

### Environment Variables
To configure the backend URL, update `API_CONFIG.BASE_URL` in `api-client.js`:
```javascript
const API_CONFIG = {
  BASE_URL: 'http://localhost:8000'
};
```

### Local Storage
- `darkMode`: Dark mode preference (true/false)
- `currentProfile`: Last selected user profile

## 🔐 Security

- No sensitive data stored in frontend
- Backend API credentials must be managed server-side and must never be committed
- The optional Gemini key is entered by the user and kept in browser session
  storage; it is sent directly to Google's API and is not suitable for a
  production-shared secret
- CORS enabled for local development only

## 📊 Performance

- No external JavaScript frameworks (minimal bundle size)
- Efficient DOM manipulation
- Lazy loading for images and content
- Optimized CSS with critical path rendering

## 🐛 Troubleshooting

### Blank Page
- Check browser console for errors (F12)
- Ensure backend is running on port 8000
- Try clearing browser cache

### Dark Mode Not Working
- Check localStorage is enabled
- Ensure JavaScript is enabled
- Try different browser

### API Not Responding
- Verify backend is running: `http://localhost:8000/docs`
- Check CORS settings in backend
- Verify firewall not blocking port 8000

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 Code Standards

- Follow existing code style
- Add comments for complex logic
- Use meaningful variable names
- Keep functions focused and modular

## 🚀 Deployment

For production deployment, serve the static frontend with a web server or static
hosting provider and run the FastAPI backend with a production ASGI process.
Update `API_CONFIG.BASE_URL` and the backend CORS allow-list for the deployed
origins.

## 📄 License

MIT License - See LICENSE file for details

## 👥 Support

For issues or questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include browser/OS information
4. Attach screenshots if applicable

## 🔗 Links

- **Backend Repository**: [IGOT Karmayogi Backend](https://github.com/Chinu2712/competra-backend)
- **API Docs**: http://localhost:8000/docs (when backend running)

---

**Made with ❤️ for Official Statistics Professionals**
