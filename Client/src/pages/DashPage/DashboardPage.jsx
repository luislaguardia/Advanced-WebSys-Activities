import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', signups: 50 },
  { name: 'Feb', signups: 65 },
  { name: 'Mar', signups: 55 },
  { name: 'Apr', signups: 70 },
  { name: 'May', signups: 90 },
];

function DashboardPage() {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2}>
        {[{ label: 'Total Users', value: 120 }, { label: 'Reports', value: 15 }, { label: 'Active Sessions', value: 8 }].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Bar Chart */}
      <Paper
        elevation={1}
        sx={{
          mt: 4,
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Monthly Sign-ups
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} barCategoryGap="25%">
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="signups" fill="#1976d2" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default DashboardPage;