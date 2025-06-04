import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useMediaQuery, 
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { HashLink } from 'react-router-hash-link';
import logoImage from '../assets/logo.png';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Wake up the API server
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        // Get API base URL from environment variables - fixed for Vite
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const WAKE_ENDPOINT = `${API_BASE_URL}/api/wake`;
        
        // Open or create a cache for storing wake time
        const cache = await caches.open('server-wake-cache');
        const cachedResponse = await cache.match('lastWakeTime');
        
        const currentTime = Date.now();
        let lastWakeTime = null;
        
        // Get the last wake time from cache if it exists
        if (cachedResponse) {
          lastWakeTime = parseInt(await cachedResponse.text());
        }
        
        // If no previous wake time or 10 minutes (600000ms) have passed
        if (!lastWakeTime || (currentTime - lastWakeTime) > 600000) {
          //console.log('Waking up the server...');
          await fetch(WAKE_ENDPOINT);
          
          // Store the current time in cache
          await cache.put('lastWakeTime', new Response(currentTime.toString()));
        }
      } catch (error) {
        //console.error('Error waking up the server:', error);
      }
    };
    
    wakeUpServer();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: "Home", to: "/#home", id: "home-link", isHash: true },
    { text: "Features", to: "/#features", id: "features-link", isHash: true },
    { text: "How It Works", to: "/#how-it-works", id: "how-it-works-link", isHash: true },
    { text: "FAQ", to: "/#faq", id: "faq-link", isHash: true },
    { text: "Saved", to: "/saved", id: "saved-link", isHash: false },
  ];

  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem 
              button 
              key={link.id} 
              component={link.isHash ? HashLink : Link} 
              to={link.to}
              {...(link.isHash ? { smooth: true } : {})}  // Only apply smooth prop to HashLink components
              sx={{ 
                padding: '16px 24px',
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.08)' 
                }
              }}
            >
              <ListItemText 
                primary={link.text} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  fontSize: '0.95rem'
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      position="sticky" 
      id="navbar" 
      elevation={1}
      sx={{
        backgroundColor: 'white',
        color: 'primary.main',
      }}
    >
      <Toolbar sx={{ padding: { xs: '0.5rem 1rem', md: '0.5rem 2rem' }, justifyContent: 'space-between' }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            minWidth: 'fit-content',
            marginRight: 2
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
              height: { xs: '32px', sm: '50px' },
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
              color: 'inherit',
              '&:hover': {
                color: 'primary.dark',
              }
            }}
            id="navbar-title"
          >
            SnapNotes
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton 
              edge="end" 
              color="primary" 
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            {mobileDrawer}
          </>
        ) : (
          <Box 
            id="navbar-links"
            sx={{ 
              display: 'flex', 
              gap: { sm: '8px', md: '16px' } 
            }}
          >
            {navLinks.map(link => (
              <Button 
                key={link.id}
                id={link.id}
                color="primary" 
                component={link.isHash ? HashLink : Link} 
                to={link.to}
                {...(link.isHash ? { smooth: true } : {})}  // Only apply smooth prop to HashLink components
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  textTransform: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {link.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
