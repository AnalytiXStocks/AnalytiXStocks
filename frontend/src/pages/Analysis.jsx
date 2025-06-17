import React, { useState } from 'react';
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

function Analysis() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!symbol) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // Simulated API response
      const mockData = {
        symbol: symbol.toUpperCase(),
        currentPrice: 175.50,
        change: 2.5,
        changePercent: 1.45,
        historicalData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          prices: [150, 155, 160, 165, 170, 175.5]
        },
        predictions: {
          nextWeek: 178.25,
          nextMonth: 182.50,
          nextQuarter: 190.00
        },
        technicalIndicators: {
          rsi: 65,
          macd: 2.5,
          movingAverage: 172.50
        }
      };

      setStockData(mockData);
    } catch (error) {
      setError('Failed to fetch stock data. Please try again.');
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = stockData ? {
    labels: stockData.historicalData.labels,
    datasets: [
      {
        label: 'Historical Price',
        data: stockData.historicalData.prices,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  } : null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Stock Analysis</h1>

      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      {stockData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Current Price</h2>
              <p className="text-2xl font-bold text-primary">${stockData.currentPrice}</p>
              <p className={`text-sm ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stockData.change >= 0 ? '+' : ''}{stockData.change} ({stockData.changePercent}%)
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Technical Indicators</h2>
              <div className="space-y-2 mt-2">
                <p>RSI: {stockData.technicalIndicators.rsi}</p>
                <p>MACD: {stockData.technicalIndicators.macd}</p>
                <p>MA: ${stockData.technicalIndicators.movingAverage}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Predictions</h2>
              <div className="space-y-2 mt-2">
                <p>Next Week: ${stockData.predictions.nextWeek}</p>
                <p>Next Month: ${stockData.predictions.nextMonth}</p>
                <p>Next Quarter: ${stockData.predictions.nextQuarter}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Price History</h2>
            <div className="h-80">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: `${stockData.symbol} Price History`
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysis; 