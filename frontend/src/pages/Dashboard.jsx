import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Market Trend',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">S&P 500</h2>
          <p className="text-2xl font-bold text-primary">4,783.45</p>
          <p className="text-green-600">+1.23%</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">NASDAQ</h2>
          <p className="text-2xl font-bold text-primary">16,742.38</p>
          <p className="text-green-600">+0.89%</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">DOW JONES</h2>
          <p className="text-2xl font-bold text-primary">37,305.16</p>
          <p className="text-red-600">-0.12%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Trend</h2>
        <div className="h-80">
          <Line data={chartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: '6-Month Market Performance'
              }
            }
          }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Gainers</h2>
          <div className="space-y-4">
            {/* Add top gainers list here */}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Losers</h2>
          <div className="space-y-4">
            {/* Add top losers list here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 