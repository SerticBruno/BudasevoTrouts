import { Line } from 'react-chartjs-2';

const MatchAttendanceChart = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [{
      label: 'Match Attendance',
      data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return <Line data={chartData} />;
};
