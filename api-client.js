/**
 * API Client for COMPETRA Frontend
 * Handles all communication with the IGOT Karmayogi Backend
 */

const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  API_V1: '/api/v1',
  TIMEOUT: 10000,
};

class APIClient {
  constructor(baseUrl = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
    this.apiV1 = `${baseUrl}${API_CONFIG.API_V1}`;
  }

  /**
   * Make a fetch request with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.apiV1}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error ${response.status}: ${errorData.detail || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request Failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Profile Management APIs
   */
  async createProfile(profileData) {
    return this.request('/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async getCompetencyProfile(userId) {
    return this.request(`/profile/${userId}/competency-profile`, {
      method: 'GET',
    });
  }

  /**
   * Content Management APIs
   */
  async uploadContent(file, title, uploaderId = null) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    if (uploaderId) formData.append('uploader_id', uploaderId);

    const url = `${this.apiV1}/content/upload`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Upload Failed: ${errorData.detail || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Content Upload Failed:', error);
      throw error;
    }
  }

  async getContent(contentId) {
    return this.request(`/content/${contentId}`, {
      method: 'GET',
    });
  }

  /**
   * Quiz APIs
   */
  async uploadMaterial(fileName, fileType, contentBase64, tags = []) {
    return this.request('/quiz/materials/upload', {
      method: 'POST',
      body: JSON.stringify({
        file_name: fileName,
        file_type: fileType,
        content_base64: contentBase64,
        tags: tags,
      }),
    });
  }

  async generateQuiz(options = {}) {
    const defaultOptions = {
      quiz_type: 'MCQ',
      difficulty: 'medium',
      num_questions: 5,
      competency_domain: 'General Competencies',
      language: 'en',
    };

    return this.request('/quiz/generate', {
      method: 'POST',
      body: JSON.stringify({ ...defaultOptions, ...options }),
    });
  }

  async evaluateQuiz(quizId, responses, learnerId = null) {
    return this.request('/quiz/evaluate', {
      method: 'POST',
      body: JSON.stringify({
        quiz_id: quizId,
        responses: responses,
        learner_id: learnerId,
      }),
    });
  }

  async getQuiz(quizId) {
    return this.request(`/quiz/${quizId}`, {
      method: 'GET',
    });
  }

  async getRecommendations(learnerId) {
    return this.request(`/quiz/recommendations/${learnerId}`, {
      method: 'GET',
    });
  }

  /**
   * Health Check
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Create a global API client instance
const apiClient = new APIClient();

/**
 * Initialize API connection and set backend status
 */
async function initializeAPI() {
  try {
    const isHealthy = await apiClient.healthCheck();
    if (isHealthy) {
      console.log('✓ Backend API connected successfully');
      return true;
    }
  } catch (error) {
    console.error('Failed to connect to backend:', error);
  }
  return false;
}

// Auto-initialize API when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAPI);
} else {
  initializeAPI();
}
