# SnapNotes AI

## Overview

SnapNotes AI is an advanced study assistance platform that leverages artificial intelligence to transform complex topics into concise, structured summaries. Built with modern web technologies, this application helps students optimize their study time by providing quick access to focused educational content derived from reliable sources.

![SnapNotes AI Interface](./screenshot.png)

## Key Features

### Content Generation
- **AI-Powered Summarization**: Extracts and distills key information from Wikipedia articles
- **Multiple Output Formats**: Generates content in paragraph, bullet-point, or Q&A formats
- **Customizable Detail Level**: Adjustable summary length (150-800 words) to match study needs
- **Citation Preservation**: Maintains factual accuracy with proper sourcing

### User Experience
- **Persistent Storage**: Browser-based local storage for saved summaries
- **Export Functionality**: Download options in PDF and TXT formats
- **Search History**: Quick access to recently searched topics
- **Responsive Design**: Optimized for all device types (desktop, tablet, mobile)
- **Privacy-Focused**: No account requirements or data collection

## Technical Architecture

### Frontend Stack
- **Framework**: React 18.3+ with functional components and hooks
- **Build System**: Vite 6.2 for optimized development and production builds
- **UI Components**: Material UI 6.4 with responsive design patterns
- **Routing**: React Router 7.3 for client-side navigation
- **State Management**: React's Context API and useState/useEffect hooks

### Integrations
- **HTTP Client**: Axios for API communication with error handling
- **Document Generation**: jsPDF 3.0 for PDF export functionality
- **Content Rendering**: React Markdown with rehype plugins for rich text display
- **Network Resilience**: Custom error handling and retry mechanisms

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/NabarupDev/SnapNotes.git
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with appropriate values

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API endpoint | http://localhost:5000 |
| VITE_MAX_SUMMARY_LENGTH | Maximum summary length | 800 |

### Build Process

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

Production artifacts are generated in the `dist/` directory, optimized for deployment.

## Project Structure

```
src/
├── assets/          # Static resources (images, icons)
├── components/      # Reusable UI components
│   ├── Features/    # Feature showcase components
│   ├── HowItWorks/  # Onboarding components
│   └── ...
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── layouts/         # Page layout components
├── pages/           # Main application views
│   ├── Home/        # Landing page
│   ├── Summarize/   # Summary generation view
│   └── Saved/       # Saved summaries view
├── services/        # API service interfaces
├── utils/           # Utility functions and helpers
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Core Workflows

### Summary Generation
1. User inputs a topic and selects format/length parameters
2. Frontend sends request to backend API
3. Backend retrieves content from Wikipedia
4. Content is processed through Google's Gemini AI
5. Structured summary is returned and displayed to user
6. User can save locally or export as needed

### Data Persistence
- All user data is stored in browser's localStorage
- No server-side persistence or user accounts
- Data can be exported as files for permanent storage

## Performance Considerations

- Lazy loading of components and libraries
- Debounced API requests to prevent excessive calls
- Optimized PDF generation for large documents
- Responsive image handling for various device sizes

## Security Implementation

- Input sanitization for user-provided content
- Content validation before rendering
- No sensitive data transmission or storage
- CORS configuration for API requests

## Browser Compatibility

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

Please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed information on:
- Code style and linting
- Branch naming conventions
- Pull request process
- Testing requirements

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact

For technical inquiries, please contact:
- Nabarup Roy - nabaruproy.dev@gmail.com
- Project Repository: [GitHub](https://github.com/NabarupDev/SnapNotes)

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Wikipedia API](https://www.mediawiki.org/wiki/API)
- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [jsPDF](https://github.com/parallax/jsPDF)
