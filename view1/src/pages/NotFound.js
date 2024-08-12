import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h1" component="div" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
}

export default NotFound;