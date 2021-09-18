import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: '# of Cases',
        data: props.data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: '# of Deaths',
        data: props.deaths,
        fill: false,
        backgroundColor: 'rgb(2, 3, 2)',
        borderColor: 'rgba(2, 3, 2, 0.2)',
        yAxisID: 'y-axis-1',
      },
      // {
      //   label: '# of Recovered',
      //   data: props.recovered,
      //   fill: false,
      //   backgroundColor: 'rgb(54, 162, 235)',
      //   borderColor: 'rgba(54, 162, 235, 0.2)',
      //   yAxisID: 'y-axis-3',
      // },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Last 90 days Line Chart for {props.title}</h1>
        <div className="links"></div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};
export default LineChart;
