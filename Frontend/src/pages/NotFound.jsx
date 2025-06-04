import { Container, Typography, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function NotFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md" sx={{ 
      textAlign: "center", 
      mt: { xs: 4, md: 8 },
      py: 4
    }}>
      <Box 
        component="img"
        src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg" 
        alt="404 illustration"
        sx={{
          width: "100%", 
          maxWidth: { xs: "300px", md: "400px" },
          mb: 4
        }}
      />
      
      <Typography variant={isMobile ? "h4" : "h3"} color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      
      <Typography 
        variant={isMobile ? "body1" : "h6"} 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
      
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        startIcon={<HomeIcon />}
        size={isMobile ? "medium" : "large"}
      >
        Back to Home
      </Button>
    </Container>
  );
}
