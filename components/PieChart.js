import { Container } from '@mui/material';
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Top 20 Countries',
        data: props.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container  maxWidth="sm">
      <div className="header">
        <h1 className="title">{props.title}</h1>
        <div className="links">
          <a className="btn btn-gh"></a>
        </div>
      </div>
      <Pie data={data} />
    </Container>
  );
};
export default PieChart;
