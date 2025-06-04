import { Box, Grid, Card, CardContent, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TuneIcon from "@mui/icons-material/Tune";
import React from "react";
const features = [
  {
    icon: <BoltIcon style={{ fontSize: 28, color: "#5048E5" }} />,
    title: "Fast Summarization",
    description:
      "Convert lengthy articles into concise, easy-to-understand summaries in seconds, saving you hours of note-taking time.",
  },
  {
    icon: <VerifiedUserIcon style={{ fontSize: 28, color: "#5048E5" }} />,
    title: "Reliable Information",
    description:
      "Our system pulls data from trusted sources like Wikipedia, ensuring you're studying accurate and verified information.",
  },
  {
    icon: <FormatListBulletedIcon style={{ fontSize: 28, color: "#5048E5" }} />,
    title: "Structured Format",
    description:
      "Information is organized in easy-to-scan bullet points or concise paragraphs, making revision quicker and more effective.",
  },
  {
    icon: <LockIcon style={{ fontSize: 28, color: "#5048E5" }} />,
    title: "Privacy First",
    description:
      "All your SnapNotes are stored only in your browser's local storage. No account required, no data collection, complete privacy.",
  },
  {
    icon: <PhoneIphoneIcon style={{ fontSize: 28, color: "#5048E5" }} />,
    title: "Fully Responsive",
    description:
      "Access your study materials on any device - desktop, tablet, or mobile - with a clean, readable interface that adapts to your screen.",
  },
  {
    icon: <TuneIcon style={{ fontSize: 28, color: "#5048E5" }} />,
    title: "Customizable",
    description:
      "Choose your summary length and format to match your study style. Create brief overviews or detailed explanations based on your needs.",
  },
];

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, sm: 5, md: 6 }, mb: { xs: 6, sm: 7, md: 8 }, position: "relative" }}>
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          mb: { xs: 3, sm: 3.5, md: 4 }, 
          textAlign: "center", 
          fontWeight: "600", 
          color: "#333",
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
        }}
      >
        Why Use Our Study Sheet Generator
      </Typography>
      
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              height: "100%",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #f0f0f0",
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <Box sx={{
                  color: "#5048E5",
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                }}>
                  {React.cloneElement(feature.icon, { 
                    style: { 
                      fontSize: isMobile ? 24 : isTablet ? 26 : 28, 
                      color: "#5048E5" 
                    } 
                  })}
                  <Typography 
                    variant={isMobile ? "subtitle1" : "h6"} 
                    fontWeight="600" 
                    sx={{ 
                      ml: 1,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } 
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.6,
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' } 
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
