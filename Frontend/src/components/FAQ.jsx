import React, { useState } from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Link, useTheme, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";

const faqData = [
    { "question": "What is this website about?", "answer": "SnapNotes helps students quickly generate summarized study notes for their exams by fetching and processing key concepts from Wikipedia." },
    { "question": "How do I generate a SnapNote?", "answer": "Simply enter your subject or topic, choose the summary length and format, and our AI will generate a structured SnapNote for you." },
    { "question": "Can I download my SnapNotes?", "answer": "Yes! You can export your SnapNotes as PDFs and save them for future reference." },
    { "question": "Does this work for all subjects?", "answer": "It works best for theoretical subjects like History, Science, and Technology. However, for subjects requiring deep analysis, manual refinement might be needed." },
    { "question": "Do I need an account to use this website?", "answer": "No, you can generate SnapNotes without creating an account. All data is stored locally in your browser." },
    { "question": "What happens if I clear my browser data?", "answer": "Since SnapNotes are stored in your browser, clearing data will permanently delete them. We recommend saving important notes as PDFs." },
    { "question": "Is this service free?", "answer": "Yes! This tool is completely free for students to use. No hidden charges or subscriptions." },
    { "question": "Do you store any personal data?", "answer": "No, we do not store any personal data." }
];

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container 
            maxWidth="md" 
            sx={{ 
                py: { xs: 3, sm: 4, md: 5 },
                px: { xs: 2, sm: 3, md: 4 }
            }}
        >
            <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="600" 
                textAlign="center" 
                gutterBottom
                sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
            >
                Frequently Asked Questions
            </Typography>
            {faqData.map((item, index) => (
                <Accordion 
                    key={index} 
                    expanded={expanded === index} 
                    onChange={handleChange(index)} 
                    sx={{ 
                        mb: { xs: 1.5, sm: 2 }, 
                        backgroundColor: "#f9f9f9",
                        '& .MuiAccordionSummary-root': {
                            minHeight: isMobile ? '48px' : '56px',
                            padding: isMobile ? '0 12px' : '0 16px',
                        }
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography 
                            fontWeight="500"
                            fontSize={{ xs: '0.95rem', sm: '1rem', md: '1.1rem' }}
                        >
                            {item.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: { xs: '8px 16px 16px', md: '16px 24px 24px' } }}>
                        <Typography 
                            color="text.secondary"
                            fontSize={{ xs: '0.9rem', sm: '0.95rem', md: '1rem' }}
                        >
                            {item.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Still have questions? */}
            <Box mt={{ xs: 3, sm: 4, md: 5 }} textAlign="center">
                <Typography 
                    variant={isMobile ? "subtitle1" : "h6"} 
                    fontWeight="600"
                    sx={{ mb: { xs: 1, sm: 1.5 } }}
                >
                    Still have questions?
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    mb={{ xs: 1, sm: 1.5, md: 2 }}
                    fontSize={{ xs: '0.85rem', sm: '0.9rem', md: '0.95rem' }}
                >
                    We're here to help! Feel free to reach out with any additional questions.
                </Typography>
                <Link 
                    href="mailto:nabaruproy.dev@gmail.com" 
                    sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        gap: { xs: 0.5, sm: 1 }, 
                        fontWeight: "500", 
                        color: "#2f54eb", 
                        textDecoration: "none",
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                >
                    <EmailIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                    nabaruproy.dev@gmail.com
                </Link>
            </Box>
        </Container>
    );
};

export default FAQ;
