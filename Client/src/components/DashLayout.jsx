import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Box, Button, CssBaseline } from '@mui/material';
import Navbar from './Navbar';

const navLinks = [
  { label: 'OVERVIEW', path: '/dashboard' },
  { label: 'REPORTS', path: '/dashboard/reports' },
  { label: 'USERS', path: '/dashboard/users' },
  { label: 'ARTICLES', path: '/dashboard/articles' },
];

function DashLayout() {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Navbar />

      {/* Top Navigation Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          px: 2,
          py: 1.5,
          backgroundColor: '#f9f9f9',
          borderBottom: '1px solid #ccc',
          position: 'sticky',
          top: '64px',
          zIndex: 100, // Reduced from 1000 to 100
        }}
      >
        {navLinks.map(({ path, label }) => (
          <Button
            key={path}
            component={Link}
            to={path}
            variant={location.pathname === path ? 'contained' : 'outlined'}
            size="small"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: '500',
              px: 2,
              color: location.pathname === path ? '#fff' : '#333',
              backgroundColor: location.pathname === path ? '#1976d2' : 'transparent',
              borderColor: '#ccc',
              '&:hover': {
                backgroundColor: '#eee',
                color: '#000',
              },
              '&.MuiButton-contained': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Dashboard Content */}
      <Box sx={{ px: 2, py: 3, backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 128px)' }}>
        <Outlet />
      </Box>
    </>
  );
}

export default DashLayout;