import { Box, Grid, Typography, Button, Container, Paper, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PublicIcon from "@mui/icons-material/Public";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const steps = [
    {
        number: "1",
        title: "Enter Your Topic",
        description: "Type in any subject or specific topic you need to study for your exam.",
    },
    {
        number: "2",
        title: "AI Processing",
        description: "Our system fetches information and uses AI to create a concise, focused summary.",
    },
    {
        number: "3",
        title: "Study & Save",
        description: "Use your cheat sheet for revision and save it locally for future reference.",
    },
];

const HowItWorks = () => {
    const navigate = useNavigate();

    const handleCreateSheet = () => {
        const homeElement = document.getElementById('home');
        if (homeElement) {
            homeElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById('home');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 10, position: "relative" }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 6,
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#2D3142",
                    letterSpacing: "0.5px"
                }}
            >
                How It Works
            </Typography>

            <Grid container spacing={5} justifyContent="center">
                {steps.map((step, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                width: 70,
                                height: 70,
                                backgroundColor: "#f7f9fc",
                                color: "#3f51b5",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "24px",
                                fontWeight: "600",
                                margin: "auto",
                                mb: 3,
                                border: "2px solid rgba(63, 81, 181, 0.15)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                            }}
                        >
                            {step.number}
                        </Box>
                        <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: "#2D3142" }}>
                            {step.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {step.description}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleCreateSheet}
                    sx={{
                        px: 5,
                        py: 1.8,
                        borderRadius: "8px",
                        backgroundColor: "#3f51b5",
                        "&:hover": {
                            backgroundColor: "#303f9f",
                        },
                        fontWeight: "600",
                        textTransform: "none",
                        fontSize: "16px",
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 12px rgba(63, 81, 181, 0.25)"
                    }}
                >
                    Create Your Study Sheet
                </Button>
            </Box>

            <Box sx={{ mt: 12, pt: 4, borderTop: "1px solid #eaeef3" }}>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        mb: 3,
                        color: "#2D3142"
                    }}
                >
                    Study Smarter, Not Harder
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "#4F5A68",
                        mb: 7,
                        maxWidth: "700px",
                        mx: "auto",
                        fontSize: "18px",
                        lineHeight: 1.7
                    }}
                >
                    Transform complex topics into clear, concise study materials that enhance comprehension and retention.
                </Typography>

                <Grid container spacing={5} justifyContent="center">
                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                width: 70,
                                height: 70,
                                backgroundColor: "#f7f9fc",
                                color: "#3f51b5",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "24px",
                                fontWeight: "600",
                                margin: "auto",
                                mb: 3,
                                border: "2px solid rgba(63, 81, 181, 0.15)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                            }}
                        >
                            1
                        </Box>
                        <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: "#2D3142" }}>
                            Enter Your Topic
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            Type in the subject or topic you want to study. Be as specific as possible for the best results.
                        </Typography>

                        <Grid item xs={12}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                    textAlign: "left",
                                    border: "1px solid #e5e8ed",
                                    backgroundColor: "#fcfcfd",
                                    boxShadow: "0 2px 16px rgba(0,0,0,0.03)"
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                                    <Box sx={{ width: 10, height: 10, backgroundColor: "#f44336", borderRadius: "50%" }} />
                                    <Box sx={{ width: 10, height: 10, backgroundColor: "#ff9800", borderRadius: "50%" }} />
                                    <Box sx={{ width: 10, height: 10, backgroundColor: "#4caf50", borderRadius: "50%" }} />
                                </Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        border: "1px solid #e0e3e7",
                                        borderRadius: 2,
                                        backgroundColor: "#ffffff",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <SearchIcon sx={{ color: "#3f51b5", mr: 1, fontSize: 20 }} />
                                    <Typography variant="body1" color="#3f51b5" fontWeight="500">
                                        Photosynthesis
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                width: 70,
                                height: 70,
                                backgroundColor: "#f7f9fc",
                                color: "#3f51b5",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "24px",
                                fontWeight: "600",
                                margin: "auto",
                                mb: 3,
                                border: "2px solid rgba(63, 81, 181, 0.15)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                            }}
                        >
                            2
                        </Box>
                        <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: "#2D3142" }}>
                            AI Processing
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            Our system processes information and transforms it into a structured, easy-to-study format.
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                backgroundColor: "#fcfcfd",
                                border: "1px solid #e5e8ed",
                                boxShadow: "0 2px 16px rgba(0,0,0,0.03)",
                                height: "auto", // 🔥 Changed this line
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Box sx={{ textAlign: "center" }}>
                                <CircularProgress size={28} sx={{ color: "#3f51b5", mb: 2 }} />
                                <Typography variant="body1" color="text.secondary" fontWeight="500">
                                    Analyzing and summarizing<br />key concepts...
                                </Typography>
                            </Box>
                        </Paper>

                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                width: 70,
                                height: 70,
                                backgroundColor: "#f7f9fc",
                                color: "#3f51b5",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "24px",
                                fontWeight: "600",
                                margin: "auto",
                                mb: 3,
                                border: "2px solid rgba(63, 81, 181, 0.15)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                            }}
                        >
                            3
                        </Box>
                        <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: "#2D3142" }}>
                            Study & Save
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            Review your personalized study sheet and save it for quick access during your exam preparation.
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                textAlign: "left",
                                width: "auto",
                                border: "1px solid #e5e8ed",
                                backgroundColor: "#fcfcfd",
                                boxShadow: "0 2px 16px rgba(0,0,0,0.03)"
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="700" color="#2D3142" sx={{ mb: 1.5 }}>
                                Photosynthesis
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1" color="#4F5A68" sx={{ mb: 0.5, lineHeight: 1.7 }}>
                                    • Process where plants convert light energy into chemical energy
                                </Typography>
                                <Typography variant="body1" color="#4F5A68" sx={{ mb: 0.5, lineHeight: 1.7 }}>
                                    • Takes place in chloroplasts using chlorophyll
                                </Typography>
                                <Typography variant="body1" color="#4F5A68" sx={{ lineHeight: 1.7 }}>
                                    • Produces glucose and oxygen from CO₂ and water
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, pt: 2, borderTop: "1px solid #eaeef3" }}>
                                <Button
                                    startIcon={<DownloadIcon />}
                                    sx={{
                                        color: "#3f51b5",
                                        textTransform: "none",
                                        fontWeight: "600",
                                        mr: 1
                                    }}
                                >
                                    Download
                                </Button>
                                <Button
                                    startIcon={<BookmarkBorderIcon />}
                                    sx={{
                                        color: "#3f51b5",
                                        textTransform: "none",
                                        fontWeight: "600"
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 8, px: { xs: 2, md: 6 }, py: 6, borderRadius: 3, backgroundColor: "#ffffff" }}>
                <Typography variant="h5" fontWeight="600" textAlign="center" mb={3}>
                    Behind the Scenes
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="start" gap={1.5}>
                            <Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <PublicIcon sx={{ fontSize: 24, color: "#42a5f5" }} />
                                    <Typography variant="h6" fontWeight="600">
                                        Wikipedia API Integration
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" mt={0.5}>
                                    We connect to Wikipedia's API to fetch accurate and reliable information about your chosen topic. This ensures you're studying with factually correct material.
                                </Typography>
                                <ul style={{ paddingLeft: "20px", marginTop: "10px", color: "#6b7280", fontSize: "14px" }}>
                                    <li>Retrieves the most relevant Wikipedia article</li>
                                    <li>Extracts key sections and content</li>
                                    <li>Maintains citations and references</li>
                                </ul>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="start" gap={1.5}>
                            <Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <LightbulbIcon sx={{ fontSize: 24, color: "#42a5f5" }} />
                                    <Typography variant="h6" fontWeight="600">
                                        Google's Gemini AI Summary
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" mt={0.5}>
                                    Our system uses Google's Gemini AI, a powerful multimodal model, to condense lengthy articles into focused, easy-to-understand summaries.
                                </Typography>
                                <ul style={{ paddingLeft: "20px", marginTop: "10px", color: "#6b7280", fontSize: "14px" }}>
                                    <li>Identifies key concepts and important facts</li>
                                    <li>Removes redundant information</li>
                                    <li>Structures content for better retention</li>
                                </ul>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box>
                    <Box display="flex" alignItems="start" gap={1.5} mb={2}>
                        <Box>

                            <Box display="flex" alignItems="center" gap={1}>
                                <LockIcon sx={{ fontSize: 24, color: "#42a5f5" }} />
                                <Typography variant="h6" fontWeight="600">
                                    Local Storage & Privacy
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Your privacy is important to us. All generated SnapNotes  are stored exclusively in your browser's local storage.
                            </Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ p: 2.5, borderRadius: 2, backgroundColor: "#fcfcfd", border: "1px solid #e5e8ed" }}>
                                <Typography fontWeight="600" mb={1}>What this means:</Typography>
                                <ul style={{ paddingLeft: "20px", color: "#6b7280", fontSize: "14px" }}>
                                    <li>No account creation required</li>
                                    <li>Your SnapNotes are only visible to you</li>
                                    <li>Access your saved sheets from the same browser/device</li>
                                </ul>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ p: 2.5, borderRadius: 2, backgroundColor: "#fcfcfd", border: "1px solid #e5e8ed" }}>
                                <Typography fontWeight="600" mb={1}>Limitations:</Typography>
                                <ul style={{ paddingLeft: "20px", color: "#6b7280", fontSize: "14px" }}>
                                    <li>Clearing browser data will remove saved sheets</li>
                                    <li>Sheets aren’t synced across different devices</li>
                                    <li>Consider exporting important sheets to PDF</li>
                                    <li>Use a password manager for sensitive data</li>
                                </ul>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={5} textAlign="center">
                    <Button 
                        variant="contained" 
                        onClick={handleCreateSheet}
                        sx={{
                            backgroundColor: "#2f54eb",
                            color: "#fff",
                            fontWeight: "600",
                            textTransform: "none",
                            px: 3,
                            py: 1.2,
                            "&:hover": { backgroundColor: "#1d39c4" }
                        }}
                    >
                        Try it Now — Free & No Sign-up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default HowItWorks;
