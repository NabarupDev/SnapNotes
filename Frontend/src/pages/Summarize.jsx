import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Container, Typography, Paper, Divider, IconButton, Snackbar, Alert } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Menu, MenuItem } from "@mui/material";

// Create silent axios instance to prevent console errors
const silentAxios = axios.create();

// Add interceptors to silence network errors
silentAxios.interceptors.response.use(
  response => response,
  error => {
    // Silently handle the error without logging to console
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || "Request failed"
    });
  }
);

const useQuery = () => new URLSearchParams(useLocation().search);

// Enhanced function to remove emojis and special characters from text
const removeEmojis = (text) => {
  return text.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2B50}\u{1F004}-\u{1F9FF}]/gu, "");
};

// Function to clean markdown syntax
const cleanMarkdown = (text) => {
  return text
    .replace(/#{1,6}\s+/g, '') // Remove headings (# Heading)
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold (**text**)
    .replace(/\*(.*?)\*/g, '$1') // Remove italic (*text*)
    .replace(/`(.*?)`/g, '$1') // Remove inline code (`text`)
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Replace links with just the text
    .replace(/^\s*[\d\u2776-\u277F\u2780-\u2788\u278A-\u27B0\u24EB-\u24FF]+[.)\]]\s*/gm, '') // Remove numbered lists (including unicode numbers)
    .replace(/^\s*[-*+]\s+/gm, '') // Remove bullet points
    .replace(/^\s*>/gm, '') // Remove blockquotes
    .replace(/\n{3,}/g, '\n\n'); // Replace multiple newlines with just two
};

// Function to sanitize text for PDF generation
const sanitizeForPDF = (text) => {
  return text
    // Remove or replace problematic Unicode characters
    .replace(/[^\x00-\x7F]/g, (char) => {
      // Common replacements for some Unicode characters
      const replacements = {
        '–': '-',    // en dash
        '—': '--',   // em dash
        '“': '"',    // opening curly quote
        '”': '"',    // closing curly quote
        '‘': "'",    // opening curly apostrophe
        '’': "'",    // closing curly apostrophe
        '•': '*',    // bullet
        '…': '...',  // ellipsis
        '′': "'",    // prime
        '″': '"',    // double prime
        '≤': '<=',   // less than or equal
        '≥': '>=',   // greater than or equal
      };

      return replacements[char] || '';  // Replace with empty string if no mapping
    })
    .replace(/\d[\u0080-\uFFFF]/g, (match) => match.charAt(0)); // Fix numbered list issues
};

const Summarize = () => {
  const query = useQuery();
  const topic = query.get("topic") || "";
  const format = query.get("format") || "bullet";
  const length = query.get("length") || 150;
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Gathering data from Wikipedia...");
  const [error, setError] = useState(null);
  const [isSensitiveContentError, setIsSensitiveContentError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (format) => {
    setAnchorEl(null);
    if (format) downloadFile(format);
  };
  const downloadFile = (format) => {
    if (!summary) return;

    // Clean the summary of both emojis and markdown syntax
    const cleanSummary = cleanMarkdown(removeEmojis(summary));

    if (format === "txt") {
      const blob = new Blob([cleanSummary], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${topic}_summary.txt`;
      link.click();
    } else if (format === "pdf") {
      import("jspdf").then(({ default: JsPDF }) => {
        const doc = new JsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4"
        });

        // Configure better PDF formatting
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Sanitize the text specifically for PDF output
        const pdfSafeText = sanitizeForPDF(cleanSummary);

        // Split text into lines to handle text wrapping properly
        const pageWidth = doc.internal.pageSize.getWidth() - 20; // 10mm margins on each side
        const lines = doc.splitTextToSize(pdfSafeText, pageWidth);

        let y = 20; // Start position from top
        const lineHeight = 7;

        // Add text in smaller chunks to avoid encoding issues
        for (let i = 0; i < lines.length; i++) {
          if (y > 270) { // A4 height is ~297mm, leave margin
            doc.addPage();
            y = 20;
          }
          doc.text(lines[i], 10, y);
          y += lineHeight;
        }

        doc.save(`${topic}_summary.pdf`);
      });
    }
  };

  const handleSave = () => {
    if (!summary || !topic) return;

    try {
      // Get existing saved summaries or initialize empty array
      const savedSummaries = JSON.parse(localStorage.getItem('savedSummaries') || '[]');

      // Create new summary object
      const summaryObj = {
        id: Date.now(),
        topic,
        summary,
        date: new Date().toISOString(),
        format,
        length
      };

      // Add new summary to the beginning of the array
      savedSummaries.unshift(summaryObj);

      // Limit to 10 saved summaries to prevent storage issues
      const trimmedSummaries = savedSummaries.slice(0, 10);

      // Save to localStorage
      localStorage.setItem('savedSummaries', JSON.stringify(trimmedSummaries));

      // Show success message
      setSnackbarMessage("Summary saved successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      // Show error message if saving fails
      setSnackbarMessage("Failed to save summary");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchSummary = () => {
    if (!topic) return;

    setLoading(true);
    setSummary(null);
    setError(null);
    setIsSensitiveContentError(false);

    let steps = [
      { message: "Gathering data from Wikipedia...", duration: 1500 },
      { message: "Processing the data with Gemini AI...", duration: 1500 },
    ];

    let stepIndex = 0;
    const loadingInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setLoadingMessage(steps[stepIndex].message);
        stepIndex++;
      } else {
        clearInterval(loadingInterval);
      }
    }, steps[0].duration);

    silentAxios
      .post(
        `${import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_URL}/api/ai/summarize`, 
        { text: topic, format, length }
      )
      .then((res) => {
        const cleanSummary = removeEmojis(res.data.summary);
        setSummary(cleanSummary);
      })
      .catch((err) => {
        if (err.status === 403) {
          setError("Request cannot be processed at this time. Please try a different topic.");
          setIsSensitiveContentError(true);
        } else if (err.status === 429) {
          setError("Service is currently busy. Please try again after a moment.");
        } else {
          setError("Unable to generate summary at this time. Please try again later.");
        }
        // No console.error here - errors are silenced
      })
      .finally(() => {
        setTimeout(() => {
          clearInterval(loadingInterval);
          setLoading(false);
        }, steps.length * 1500);
      });

    return () => clearInterval(loadingInterval);
  };

  useEffect(() => {
    fetchSummary();
  }, [topic, format, length]);

  const customRenderers = {
    p: ({ node, children, ...props }) => {
      const content = children.toString().trim();

      if (content.startsWith("Q:")) {
        return (
          <Paper elevation={1} sx={{
            p: 2, mt: 3, mb: 1, borderLeft: "4px solid #3f51b5", bgcolor: "#f0f5ff",
            wordBreak: "break-word", whiteSpace: "pre-wrap"
          }}>
            <Typography
              variant="subtitle1" fontWeight="bold" color="primary"
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {content}
            </Typography>
          </Paper>
        );
      }

      if (content.startsWith("A:")) {
        return (
          <Paper elevation={0} sx={{
            p: 2, ml: 3, mt: 1, mb: 3, bgcolor: "#f5f5f5",
            wordBreak: "break-word", whiteSpace: "pre-wrap"
          }}>
            <Typography
              variant="body1" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {content.replace(/^A:\s*/, "\n")}
            </Typography>
          </Paper>
        );
      }

      return (
        <Typography
          variant="body1" sx={{ mt: 1, mb: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          {...props}>
          {children}
        </Typography>
      );
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5" fontWeight="bold" color="primary"
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" } }}>
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </Typography>
          <Box>
            {!loading && (
              isSensitiveContentError ? (
                <IconButton color="primary" onClick={handleGoBack} title="Go back to home">
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton color="primary" onClick={fetchSummary}><RefreshIcon /></IconButton>
                  <IconButton color="primary" onClick={handleSave} title="Save to local storage">
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={handleMenuOpen}>
                    <DownloadIcon />
                  </IconButton>
                </>
              )
            )}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose(null)}>
              <MenuItem onClick={() => handleMenuClose("txt")}>Download as TXT</MenuItem>
              <MenuItem onClick={() => handleMenuClose("pdf")}>Download as PDF</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Typography
          variant="body2" color="text.secondary"
          sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}>
          Generated on {new Date().toDateString()}
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />

        {/* Loading & Error Handling */}
        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5, mb: 5 }}>
            <CircularProgress />
            <Typography
              variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              {loadingMessage}
            </Typography>
          </Box>
        ) : error ? (
          <Typography
            color="error" sx={{ mt: 3, mb: 3, fontSize: { xs: "1rem", sm: "1.2rem" }, textAlign: "center" }}>
            {error}
          </Typography>
        ) : (
          <Box sx={{ p: 2 }}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={customRenderers}>
              {summary}
            </ReactMarkdown>
          </Box>
        )}

        {/* Source Info */}
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          Source: Generated from Wikipedia article on {topic}
        </Typography>
      </Paper>

      {/* Fix the Snackbar implementation to prevent the ownerState prop warning */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {/* Wrap Alert in a function to prevent prop forwarding issues */}
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
          // Remove any unwanted props with a custom wrapper
          {...(({ ownerState, ...rest }) => rest)({ ownerState: null })}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Summarize;
