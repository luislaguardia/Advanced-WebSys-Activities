import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const reportData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 450 },
  { month: 'Mar', value: 470 },
  { month: 'Apr', value: 500 },
  { month: 'May', value: 520 },
];

function ReportsPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Reports & Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              1,200
            </Typography>
            <Typography variant="subtitle1">Monthly Visits</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              320
            </Typography>
            <Typography variant="subtitle1">New Signups</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              85%
            </Typography>
            <Typography variant="subtitle1">Satisfaction Rate</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={4} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Performance Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={reportData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
}

export default ReportsPage;