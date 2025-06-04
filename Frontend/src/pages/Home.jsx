import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Container, TextField, Typography, Grid, Card, CardContent,
  MenuItem, Select, FormControl, InputLabel, Paper, Divider, alpha, useMediaQuery, useTheme,
  List, ListItem, ListItemText, ListItemButton, Chip
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import StorageIcon from "@mui/icons-material/Storage";
import ShieldIcon from "@mui/icons-material/Shield";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const [topic, setTopic] = useState("");
  const [summaryLength, setSummaryLength] = useState(300);
  const [format, setFormat] = useState("paragraph");
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedSummaries, setSavedSummaries] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    // Load recent searches from localStorage when component mounts
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
    
    // Load saved summaries from localStorage
    const storedSummaries = localStorage.getItem('savedSummaries');
    if (storedSummaries) {
      setSavedSummaries(JSON.parse(storedSummaries));
    }
  }, []);

  const updateRecentSearches = (newTopic) => {
    if (!newTopic || newTopic.trim() === "") return;
    
    // Create object with topic, date and time
    const searchEntry = {
      topic: newTopic,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString()
    };
    
    // Filter out duplicates of the same topic
    const filteredSearches = recentSearches.filter(item => item.topic !== newTopic);
    
    // Add new search to the beginning
    const updatedSearches = [searchEntry, ...filteredSearches];
    
    // Keep only the 3 most recent searches
    const limitedSearches = updatedSearches.slice(0, 3);
    
    // Update state and localStorage
    setRecentSearches(limitedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
  };

  const handleGenerate = () => {
    if (topic.trim() === "") return;
    
    // Update recent searches before navigating
    updateRecentSearches(topic);
    
    navigate(`/summarize?topic=${encodeURIComponent(topic)}&format=${format}&length=${summaryLength}`);
  };

  // Function to calculate time elapsed
  const getTimeElapsed = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  const handleRecentSearchClick = (searchTopic) => {
    setTopic(searchTopic);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const viewAllSavedSummaries = () => {
    navigate('/saved');
  };
  
  const viewSavedSummary = (id) => {
    navigate(`/saved/${id}`);
  };

  return (
    <Box sx={{
      background: "#ffffff",
      minHeight: "100vh",
      pt: 1
    }}>
      {/* Hero Section with Subtle Gradient */}
      <Box sx={{
        background: "#f5f7fa",
        py: { xs: 4, sm: 6, md: 8 },
        borderRadius: { xs: 0, md: "0 0 20px 20px" },
        color: "#1a1a1a",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
      }}>
        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}>
          <AutoAwesomeIcon sx={{ fontSize: { xs: 24, sm: 28, md: 30 }, mb: 2, color: "#5048E5" }} />
          <Typography variant="h3" fontWeight="600" sx={{
            color: "#1a1a1a",
            mb: 2,
            letterSpacing: "-0.5px",
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
          }}>
            Simplify Your Study Sessions
          </Typography>
          <Typography variant="h6" sx={{
            fontWeight: 400,
            maxWidth: "700px",
            mx: "auto",
            color: "#555",
            mb: 4,
            lineHeight: 1.6,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
          }}>
            Create concise, focused notes for efficient exam revision.
          </Typography>

          {/* Quick Search */}
          <Box sx={{
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: "center",
            mt: 2,
            maxWidth: "650px",
            mx: "auto",
            gap: { xs: 2, sm: 0 }
          }}>
            <TextField
              variant="outlined"
              placeholder="Enter a subject or topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "70%" },
                mr: { xs: 0, sm: 2 },
                backgroundColor: "#ffffff",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleGenerate}
              sx={{
                borderRadius: "6px",
                px: { xs: 2, md: 4 },
                py: { xs: 1, md: 1.5 },
                width: { xs: "100%", sm: "auto" },
                fontWeight: "600",
                backgroundColor: "#5048E5",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#4239d0",
                }
              }}
            >
              Generate
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 }, position: "relative" }}>
        {/* Features Section */}
        <Typography variant="h5" sx={{ 
          mb: { xs: 3, md: 4 }, 
          textAlign: "center", 
          fontWeight: "600", 
          color: "#333",
          fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
        }}>
          How it helps your studies
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {[
            { icon: <BoltIcon fontSize={isMobile ? "small" : "medium"} />, title: "Instant Summaries", desc: "Generate concise summaries from reliable sources quickly." },
            { icon: <StorageIcon fontSize={isMobile ? "small" : "medium"} />, title: "Local Storage", desc: "Your SnapNotes are stored locally for privacy and quick access." },
            { icon: <ShieldIcon fontSize={isMobile ? "small" : "medium"} />, title: "Distraction-Free", desc: "Clean design focused on readability and effective studying." }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid #f0f0f0",
              }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{
                    color: "#5048E5",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                  }}>
                    {feature.icon}
                    <Typography variant="h6" fontWeight="600" sx={{ 
                      ml: 1,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                    }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    lineHeight: 1.6,
                    fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.875rem' } 
                  }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: { xs: 4, md: 6 } }} />

        {/* Generator UI */}
        <Paper elevation={0} sx={{
          mt: { xs: 2, md: 4 },
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          backgroundColor: "#fafafa",
          border: "1px solid #f0f0f0"
        }}>
          <Typography variant="h5" fontWeight="600" sx={{ 
            mb: { xs: 2, md: 3 }, 
            color: "#333",
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
          }}>
            Create Your Study Sheet
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: { xs: 3, md: 4 }, 
            color: "#666",
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' }
          }}>
            Customize your summary to fit your study needs
          </Typography>

          {/* Form Inputs */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Topic or Subject"
                placeholder="E.g., Quantum Physics, French Revolution, Organic Chemistry"
                variant="outlined"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
            </Grid>

            {/* Summary Length Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Summary Length</InputLabel>
                <Select
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(e.target.value)}
                  label="Summary Length"
                  sx={{ 
                    borderRadius: "6px",
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  <MenuItem value={150} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Short (150 words)</MenuItem>
                  <MenuItem value={300} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Standard (300 words)</MenuItem>
                  <MenuItem value={500} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Detailed (500 words)</MenuItem>
                  <MenuItem value={800} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Comprehensive (800 words)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Format Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Format</InputLabel>
                <Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  label="Format"
                  sx={{ 
                    borderRadius: "6px",
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  <MenuItem value="paragraph" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Paragraphs</MenuItem>
                  <MenuItem value="bullets" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Bullet Points</MenuItem>
                  <MenuItem value="qa" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Question & Answer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Generate Button */}
            <Grid item xs={12} sx={{ mt: { xs: 1, md: 2 } }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleGenerate}
                startIcon={<SearchIcon />}
                sx={{
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  borderRadius: "6px",
                  backgroundColor: "#5048E5",
                  "&:hover": {
                    backgroundColor: "#4239d0",
                  },
                  fontWeight: "600",
                  textTransform: "none",
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' }
                }}
              >
                Generate Study Sheet
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Recent Searches Section */}
        {recentSearches.length > 0 && (
          <Paper elevation={0} sx={{
            mt: { xs: 3, md: 4 },
            p: { xs: 2, sm: 3, md: 3 },
            borderRadius: 2,
            backgroundColor: "#f5f7fa",
            border: "1px solid #f0f0f0"
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HistoryIcon sx={{ color: '#5048E5', mr: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }} />
              <Typography variant="h6" fontWeight="500" sx={{ 
                color: "#333",
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
              }}>
                Recent Searches
              </Typography>
            </Box>
            <List sx={{ py: 0 }}>
              {recentSearches.map((search, index) => (
                <ListItem 
                  key={index} 
                  disablePadding 
                  sx={{ 
                    mb: 1, 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <ListItemButton 
                    onClick={() => handleRecentSearchClick(search.topic)}
                    sx={{ 
                      borderRadius: '8px',
                      py: 1,
                      '&:hover': {
                        backgroundColor: alpha('#5048E5', 0.05),
                      }
                    }}
                  >
                    <ListItemText 
                      primary={search.topic} 
                      primaryTypographyProps={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                      secondary={getTimeElapsed(search.timestamp)}
                      secondaryTypographyProps={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.75rem', sm: '0.8rem' }
                      }}
                    />
                    <Chip 
                      size="small" 
                      label={getTimeElapsed(search.timestamp)} 
                      sx={{ 
                        backgroundColor: alpha('#5048E5', 0.1),
                        color: '#5048E5',
                        fontSize: '0.7rem',
                        fontWeight: 500
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Saved Summaries Section */}
        {savedSummaries.length > 0 && (
          <Paper elevation={0} sx={{
            mt: { xs: 3, md: 4 },
            p: { xs: 2, sm: 3, md: 3 },
            borderRadius: 2,
            backgroundColor: "#f5f7fa",
            border: "1px solid #f0f0f0"
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BookmarkIcon sx={{ color: '#5048E5', mr: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }} />
                <Typography variant="h6" fontWeight="500" sx={{ 
                  color: "#333",
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
                }}>
                  Saved Topics
                </Typography>
              </Box>
              
              {savedSummaries.length > 3 && (
                <Button 
                  size="small" 
                  endIcon={<ArrowForwardIcon />} 
                  onClick={viewAllSavedSummaries}
                  sx={{
                    textTransform: 'none',
                    color: '#5048E5',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: alpha('#5048E5', 0.05),
                    }
                  }}
                >
                  View All
                </Button>
              )}
            </Box>
            <List sx={{ py: 0 }}>
              {savedSummaries.slice(0, 3).map((summary) => (
                <ListItem 
                  key={summary.id} 
                  disablePadding 
                  sx={{ 
                    mb: 1, 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <ListItemButton 
                    onClick={() => viewSavedSummary(summary.id)}
                    sx={{ 
                      borderRadius: '8px',
                      py: 1,
                      '&:hover': {
                        backgroundColor: alpha('#5048E5', 0.05),
                      }
                    }}
                  >
                    <ListItemText 
                      primary={summary.topic} 
                      primaryTypographyProps={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                      secondary={`${summary.format.charAt(0).toUpperCase() + summary.format.slice(1)} • ${summary.length} words`}
                      secondaryTypographyProps={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.75rem', sm: '0.8rem' }
                      }}
                    />
                    <Chip 
                      size="small" 
                      label={formatDate(summary.date)}
                      sx={{ 
                        backgroundColor: alpha('#5048E5', 0.1),
                        color: '#5048E5',
                        fontSize: '0.7rem',
                        fontWeight: 500
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Home;
