import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemButton,
  alpha, Chip, Divider, IconButton, Button, Grid, Card, CardContent,
  Menu, MenuItem
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { jsPDF } from 'jspdf';

const Saved = () => {
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const open = Boolean(anchorEl);
  
  const handleSaveClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to download as TXT document
  const downloadAsTxt = () => {
    if (!selectedSummary) return;
    
    // Create text content - only include summary and clean up numbered lists
    let cleanSummary = selectedSummary.summary
      .replace(/\*\*/g, '') // Remove markdown formatting
      .replace(/(\d+)️⃣/g, '$1.') // Replace emoji numbers with regular numbers followed by a period
      .replace(/[^\x00-\x7F]/g, ' '); // Replace other non-ASCII chars
    
    const textContent = `${selectedSummary.topic}\n\n${cleanSummary}`;
    
    // Create blob and download
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedSummary.topic.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };
  
  // Function to download as PDF
  const downloadAsPDF = () => {
    if (!selectedSummary) return;
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Ensure consistent font usage
    doc.setFont('helvetica', 'normal');
    
    // Clean up the text to avoid encoding issues
    let cleanSummary = selectedSummary.summary
      .replace(/\*\*/g, '') // Remove markdown formatting
      .replace(/(\d+)️⃣/g, '$1.') // Replace emoji numbers with regular numbers
      .replace(/[^\x00-\x7F]/g, ' '); // Replace other non-ASCII chars
    
    // Skip title and start directly with content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Split text to properly fit on multiple pages
    const textLines = doc.splitTextToSize(cleanSummary, 170);
    
    // Add text with automatic page breaks as needed
    let y = 20; // Starting y position
    const lineHeight = 7; // Approximate line height in mm
    const pageHeight = doc.internal.pageSize.height - 40; // Usable page height (margins)
    const linesPerPage = Math.floor(pageHeight / lineHeight);
    
    for (let i = 0; i < textLines.length; i++) {
      if (i > 0 && i % linesPerPage === 0) {
        doc.addPage(); // Add a new page
        y = 20; // Reset y position
      }
      
      doc.text(textLines[i], 20, y);
      y += lineHeight;
    }
    
    // Save the PDF
    doc.save(`${selectedSummary.topic.replace(/\s+/g, '_')}.pdf`);
    handleClose();
  };
  
  // Function to delete the current summary
  const handleDeleteCurrentSummary = () => {
    if (!selectedSummary) return;
    
    const updatedSummaries = savedSummaries.filter(s => s.id !== selectedSummary.id);
    localStorage.setItem('savedSummaries', JSON.stringify(updatedSummaries));
    setSavedSummaries(updatedSummaries);
    navigate('/saved');
  };

  useEffect(() => {
    // Load saved summaries from localStorage
    const storedSummaries = localStorage.getItem('savedSummaries');
    const summaries = storedSummaries ? JSON.parse(storedSummaries) : [];
    setSavedSummaries(summaries);
    
    // If there's an ID parameter, find the matching summary
    if (id) {
      const summary = summaries.find(s => s.id.toString() === id);
      setSelectedSummary(summary);
    } else {
      setSelectedSummary(null);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Format text with bold markdown
  const formatTextWithBold = (text) => {
    if (!text) return '';
    
    // Split by ** pattern and process
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Extract content between ** and render as bold
        const boldContent = part.substring(2, part.length - 2);
        return <span key={index} style={{ fontWeight: 'bold' }}>{boldContent}</span>;
      }
      return part;
    });
  };

  const handleViewSummary = (summaryId) => {
    navigate(`/saved/${summaryId}`);
  };

  const handleDeleteSummary = (summaryId, event) => {
    event.stopPropagation();
    const updatedSummaries = savedSummaries.filter(s => s.id !== summaryId);
    localStorage.setItem('savedSummaries', JSON.stringify(updatedSummaries));
    setSavedSummaries(updatedSummaries);
    
    // If we're viewing the deleted summary, go back to the saved list
    if (selectedSummary && selectedSummary.id === summaryId) {
      navigate('/saved');
    }
  };

  const goBack = () => {
    if (selectedSummary) {
      navigate('/saved');
    } else {
      navigate('/');
    }
  };

  // Detail view of a single summary
  if (selectedSummary) {
    return (
      <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton onClick={goBack} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <IconButton 
              onClick={handleSaveClick}
              aria-controls={open ? 'save-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{ mr: 1 }}
            >
              <SaveAltIcon />
            </IconButton>
            <IconButton 
              onClick={handleDeleteCurrentSummary}
              sx={{ 
                mr: 2,
                color: 'text.secondary',
                '&:hover': {
                  color: 'error.main',
                  backgroundColor: alpha('#f44336', 0.1),
                }
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
            <Menu
              id="save-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'save-button',
              }}
            >
              <MenuItem onClick={downloadAsTxt}>
                <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                Save as TXT
              </MenuItem>
              <MenuItem onClick={downloadAsPDF}>
                <PictureAsPdfIcon fontSize="small" sx={{ mr: 1 }} />
                Save as PDF
              </MenuItem>
            </Menu>
            <Typography variant="h5" fontWeight={600}>
              {selectedSummary.topic}
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 3, border: "1px solid #f0f0f0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box>
                <Chip 
                  size="small" 
                  label={selectedSummary.format.charAt(0).toUpperCase() + selectedSummary.format.slice(1)}
                  sx={{ 
                    backgroundColor: alpha('#5048E5', 0.1),
                    color: '#5048E5',
                    mr: 1
                  }}
                />
                <Chip 
                  size="small" 
                  label={`${selectedSummary.length} words`}
                  sx={{ 
                    backgroundColor: alpha('#5048E5', 0.1),
                    color: '#5048E5'
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {formatDate(selectedSummary.date)}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography 
              variant="body1" 
              component="div" 
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {formatTextWithBold(selectedSummary.summary)}
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  // List view of all saved summaries
  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={goBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BookmarkIcon sx={{ color: '#5048E5', mr: 1 }} />
            <Typography variant="h5" fontWeight={600}>
              Saved Topics
            </Typography>
          </Box>
        </Box>

        {savedSummaries.length > 0 ? (
          <List sx={{ p: 0 }}>
            {savedSummaries.map((summary) => (
              <Paper 
                key={summary.id}
                elevation={0} 
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: "1px solid #f0f0f0"
                }}
              >
                <ListItemButton
                  onClick={() => handleViewSummary(summary.id)}
                  sx={{ 
                    p: 2,
                    '&:hover': {
                      backgroundColor: alpha('#5048E5', 0.03),
                    }
                  }}
                >
                  <ListItemText 
                    disableTypography
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight={500} component="div">
                          {summary.topic}
                        </Typography>
                        <IconButton 
                          size="small"
                          onClick={(e) => handleDeleteSummary(summary.id, e)}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'error.main',
                              backgroundColor: alpha('#f44336', 0.1),
                            }
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }} component="div">
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} component="div">
                          <Chip 
                            size="small" 
                            label={summary.format.charAt(0).toUpperCase() + summary.format.slice(1)}
                            sx={{ 
                              backgroundColor: alpha('#5048E5', 0.1),
                              color: '#5048E5',
                              mr: 1
                            }}
                          />
                          <Chip 
                            size="small" 
                            label={`${summary.length} words`}
                            sx={{ 
                              backgroundColor: alpha('#5048E5', 0.1),
                              color: '#5048E5'
                            }}
                          />
                          <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 'auto' }}>
                            {formatDate(summary.date)}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          component="div"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {formatTextWithBold(summary.summary.substring(0, 150))}...
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </Paper>
            ))}
          </List>
        ) : (
          <Card sx={{ 
            textAlign: 'center', 
            p: 4, 
            borderRadius: 2,
            border: "1px solid #f0f0f0",
            boxShadow: 'none'
          }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ 
                  width: 120,
                  height: 120,
                  margin: '0 auto',
                  backgroundColor: alpha('#5048E5', 0.1),
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookmarksIcon sx={{ fontSize: 60, color: '#5048E5' }} />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>No saved topics yet</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                When you save a topic, it will appear here for easy access
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                  backgroundColor: "#5048E5",
                  '&:hover': {
                    backgroundColor: "#4239d0",
                  }
                }}
              >
                Create a Summary
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default Saved;
