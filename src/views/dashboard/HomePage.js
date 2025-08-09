// src/views/dashboard/HomePage.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function HomePage() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Users',
        data: [200, 400, 300, 500, 700],
        fill: false,
        borderColor: '#4e73df',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Card>
          <CardContent>
            <Typography variant="h5">1,234</Typography>
            <Typography color="textSecondary">Total Users</Typography>
            <Line data={chartData} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5">567</Typography>
            <Typography color="textSecondary">New Users</Typography>
            <div style={{ marginTop: '10px', background: '#ddd', height: '10px', borderRadius: '5px' }}>
              <div style={{ width: '70%', height: '100%', background: '#4e73df', borderRadius: '5px' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5">10,234</Typography>
            <Typography color="textSecondary">Sales</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5">2,345</Typography>
            <Typography color="textSecondary">Visits</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
