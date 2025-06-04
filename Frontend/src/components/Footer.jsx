import { Link } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  IconButton, 
  useTheme,
  useMediaQuery,
  Divider
} from "@mui/material";
import { HashLink } from 'react-router-hash-link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import logoImage from '../assets/logo.png';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Custom scroll function with offset for HashLinks
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -70; // Navbar height offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  const navLinks = [
    { text: "Home", to: "/#home", id: "home-footer-link", isHash: true },
    { text: "Features", to: "/#features", id: "features-footer-link", isHash: true },
    { text: "How It Works", to: "/#how-it-works", id: "how-it-works-footer-link", isHash: true },
    { text: "FAQ", to: "/#faq", id: "faq-footer-link", isHash: true },
    { text: "Saved", to: "/saved", id: "saved-footer-link", isHash: false },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'white',
        color: 'text.secondary',
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                marginBottom: 2,
              }}
            >
              <Box
                component="img"
                src={logoImage}
                alt="SnapNotes"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
                sx={{
                  height: { xs: '32px', sm: '40px' },
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  display: 'none',
                  fontWeight: 700,
                  fontSize: { xs: '1.2rem', sm: '1.4rem' },
                  letterSpacing: '0.5px',
                  color: 'primary.main',
                  '&:hover': {
                    color: 'primary.dark',
                  }
                }}
              >
                SnapNotes
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your AI-powered coding assistant that helps you quickly find solutions to programming challenges and tasks.
            </Typography>
          </Grid>
          
          {/* Navigation links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
              Quick Links
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 1,
                width: 'fit-content' // This makes the box use minimum width
              }}
            >
              {navLinks.map(link => (
                <Typography
                  key={link.id}
                  variant="body2"
                  component={link.isHash ? HashLink : Link}
                  to={link.to}
                  scroll={link.isHash ? scrollWithOffset : null}
                  sx={{
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.2s',
                    width: 'fit-content', // Use auto width for the text
                    display: 'inline-block' // Make the element only take up as much space as needed
                  }}
                >
                  {link.text}
                </Typography>
              ))}
            </Box>
          </Grid>
          
          {/* Contact and Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
              Connect With Me
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton 
                color="primary" 
                aria-label="GitHub" 
                size="small"
                component="a"
                href="https://github.com/NabarupDev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="LinkedIn" 
                size="small"
                component="a"
                href="https://www.linkedin.com/in/nabarup-roy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Contact: nabaruproy.dev@gmail.com
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Copyright */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Nabarup Roy. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
