# SnapNotes AI

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Frontend Status](https://img.shields.io/badge/Frontend-React-61dafb)](./Frontend)
[![Backend Status](https://img.shields.io/badge/Backend-Node.js-339933)](./Backend)

</div>


## 📚 Overview

SnapNotes AI is an intelligent study assistant platform that transforms complex educational topics into concise, structured summaries. By leveraging Google's Gemini AI technology, SnapNotes helps students optimize their study time with focused, accurate educational content derived from reliable sources.

This monorepo contains both the React-based frontend application and Node.js/Express backend API that power the SnapNotes platform.


![SnapNotes AI Interface](https://github.com/user-attachments/assets/f6a0095c-5ea6-4390-9296-899405b4b8a1)

## ✨ Key Features

- **AI-Powered Summarization**: Transform complex topics into structured, easy-to-understand content
- **Multiple Output Formats**: Generate summaries in paragraph, bullet-point, or Q&A formats
- **Customizable Detail Level**: Adjust summary length to match your study needs
- **Citation Preservation**: Maintain factual accuracy with proper sourcing
- **Local Storage**: Save summaries for offline access without requiring accounts
- **Export Options**: Download summaries as PDF or TXT files
- **Responsive Design**: Access from any device with a consistent experience
- **Privacy-Focused**: No account requirements or data collection

## 🏗️ Architecture

SnapNotes uses a modern web architecture:

```
SnapNotes/
├── Frontend/           # React application
│   ├── src/            # Frontend source code
│   ├── public/         # Static assets
│   └── ...
├── Backend/            # Node.js Express API
│   ├── src/            # Backend source code
│   ├── tests/          # API tests
│   └── ...
└── ...
```

### Technology Stack

- **Frontend**: React 18.3+, Vite 6.2, Material UI 6.4, React Router 7.3
- **Backend**: Node.js, Express, Google Gemini AI API
- **Integrations**: Wikipedia API, jsPDF, React Markdown

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x
- Git
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NabarupDev/SnapNotes.git
   cd SnapNotes
   ```

2. Set up the backend:
   ```bash
   cd Backend
   npm install
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

3. Set up the frontend:
   ```bash
   cd ../Frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with appropriate values
   ```

4. Start the development servers:
   ```bash
   # In the Backend directory
   npm run dev
   
   # In a new terminal, in the Frontend directory
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## 📋 Usage

1. Navigate to the application in your browser
2. Enter a topic you want to study in the search field
3. Select your preferred format (paragraph, bullet points, Q&A)
4. Choose the desired level of detail
5. Generate your summary
6. Save, export, or continue researching new topics

## 🧪 Testing

```bash
# Test the backend API
cd Backend
npm test

# Test the frontend application
cd Frontend
npm test
```

## 🔄 Workflow

1. User inputs a topic and parameters in the frontend
2. Request is sent to the backend API
3. Backend fetches relevant content from Wikipedia
4. Content is processed through Google's Gemini AI
5. Structured summary is returned to the frontend
6. User can save locally or export as needed

## 🛠️ Deployment

### Backend Deployment
The backend is ready for deployment on:
- AWS Elastic Beanstalk
- Google Cloud Run
- Azure App Service
- Heroku
- Docker containers

### Frontend Deployment
The frontend can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 👥 Contributing

We welcome contributions to SnapNotes! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) file for guidelines on how to help improve this project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Contact

For technical inquiries, please contact:
- Nabarup Roy - nabaruproy.dev@gmail.com
- Project Repository: [GitHub](https://github.com/NabarupDev/SnapNotes)
- Twitter: [@Nabarup_Roy](https://twitter.com/Nabarup_Roy)

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Material UI](https://mui.com/)
- [Wikipedia API](https://www.mediawiki.org/wiki/API)
- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [jsPDF](https://github.com/parallax/jsPDF)
