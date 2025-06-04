# SnapNotes Backend API

A high-performance Node.js Express API for generating educational content with AI-powered summarization. This backend service leverages Google's Gemini model to transform complex topics into structured, easy-to-understand educational materials.

![Node.js](https://img.shields.io/badge/Node.js-v16%2B-green)
![Express](https://img.shields.io/badge/Express-v4.21-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Overview

SnapNotes Backend provides a RESTful API that handles:
- Content generation using Gemini AI with educational prompt engineering
- Multi-layered content safety filtering
- Request rate limiting and validation
- Comprehensive error handling with actionable feedback
- Stateless architecture supporting horizontal scaling

## 🏗️ Architecture

```
├── controllers/           # Request handlers
│   └── aiController.js    # AI summarization logic
├── routes/                # API route definitions
│   └── aiRoutes.js        # AI-related endpoints
├── index.js               # Application entry point
├── .env                   # Environment configuration
└── package.json           # Dependencies and scripts
```

### Key Components:

- **Express.js**: Handles HTTP requests and routing
- **Content Safety Layer**: Multi-stage filtering for request and response content
- **Rate Limiting**: Prevents API abuse through request throttling
- **Gemini AI Integration**: Structured educational content generation
- **Error Handling**: Comprehensive error management with descriptive responses

## 🚀 Prerequisites

- **Node.js**: v16.x or higher
- **NPM/Yarn**: Latest stable version
- **Gemini API Key**: Obtain from [Google AI Studio](https://aistudio.google.com/)
- **Environment**: 1GB+ RAM recommended for optimal performance

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NabarupDev/SnapNotes.git
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000                   # Optional, defaults to 5000
   ```

4. **Start the server**
   ```bash
   # Production
   npm start
   
   # Development with auto-reload
   npm run dev
   ```

## 🔌 API Reference

### Health Check
```http
GET /api/wake
```
Confirms API is operational.

**Response**: `200 OK`
```
🚀 Cheat-Sheet API is running...
```

### Generate Educational Content
```http
POST /api/ai/summarize
```

**Request Body**
```json
{
  "text": "Explain quantum computing for beginners",
  "format": "cheat-sheet",
  "length": "500"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | **Required**. Topic or question to explain |
| `format` | `string` | **Required**. Output format (cheat-sheet, notes, summary) |
| `length` | `string` | **Required**. Target word count for the response |

**Success Response**: `200 OK`
```json
{
  "summary": "## Quantum Computing\n\n### Definition:\nQuantum computing is a type of computation that..."
}
```

**Error Responses**

`400 Bad Request`: Missing required fields
```json
{
  "error": "Missing required fields: text, format, length"
}
```

`403 Forbidden`: Content safety violation
```json
{
  "error": "Request contains potentially sensitive content that cannot be processed.",
  "rewriteSuggestion": "Your request was flagged by our content filter...",
  "detectedPatterns": ["pattern1", "pattern2"]
}
```

`429 Too Many Requests`: Rate limit exceeded
```json
{
  "error": "Too many requests, please try again after a minute"
}
```

`500 Internal Server Error`: Server-side issue
```json
{
  "error": "AI Summarization failed. Try again later."
}
```

## 🔒 Security Considerations

This API implements multiple security layers:

1. **Content Safety Filtering**:
   - Request validation before processing
   - Response validation after AI generation
   - Comprehensive pattern detection for inappropriate content

2. **Rate Limiting**:
   - 10 requests per minute per IP address
   - Prevents API abuse and DoS attacks

3. **Environment Security**:
   - API keys stored in environment variables
   - No sensitive credentials in codebase

4. **Input Validation**:
   - Required field validation
   - Size limits on input parameters

## 🚢 Deployment

### Local Environment
Suitable for development and testing:
```bash
npm start
```

### Docker Deployment
```bash
# Build container
docker build -t snapnotes-backend .

# Run container
docker run -p 5000:5000 --env-file .env snapnotes-backend
```

### Cloud Deployment Options

#### Heroku
```bash
heroku create
git push heroku main
heroku config:set GEMINI_API_KEY=your_gemini_api_key
```

#### AWS Elastic Beanstalk
Deploy using the EB CLI or AWS Console with environment variables configured.

#### Google Cloud Run
Stateless architecture makes this service ideal for serverless deployment.

## 🧰 Development

### Code Structure
- **Controller Pattern**: Business logic encapsulated in controllers
- **Middleware Approach**: Request processing through composable middleware
- **Error Handling**: Centralized error management
- **Environment Configuration**: Externalized configuration via .env

### Testing Strategy
```bash
# Run tests (once implemented)
npm test

# Manual API testing with curl
curl -X POST http://localhost:5000/api/ai/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Explain linear algebra", "format":"cheat-sheet", "length":"300"}'
```

## 📊 Performance Considerations

- **Response Time**: Target <1s for AI summarization requests
- **Concurrency**: Handles multiple simultaneous requests
- **Scaling**: Horizontally scalable due to stateless design
- **Memory Usage**: ~100MB baseline, spikes during AI processing

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the code style guidelines
4. Ensure tests pass
5. Submit a pull request

## 📞 Contact

For technical inquiries, please contact:
- Nabarup Roy - nabaruproy.dev@gmail.com
- Project Repository: [GitHub](https://github.com/NabarupDev/SnapNotes)
- Twitter: [@Nabarup_Roy](https://twitter.com/Nabarup_Roy)