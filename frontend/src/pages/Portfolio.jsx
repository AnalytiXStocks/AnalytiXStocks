import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchPortfolio = async () => {
      try {
        // Simulated portfolio data
        const mockPortfolio = [
          { symbol: 'AAPL', shares: 10, avgPrice: 150.25, currentPrice: 175.50 },
          { symbol: 'GOOGL', shares: 5, avgPrice: 2800.00, currentPrice: 2950.75 },
          { symbol: 'MSFT', shares: 8, avgPrice: 280.50, currentPrice: 310.25 }
        ];
        
        setPortfolio(mockPortfolio);
        const total = mockPortfolio.reduce((acc, stock) => 
          acc + (stock.shares * stock.currentPrice), 0);
        setTotalValue(total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl font-bold text-primary">${totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shares
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg. Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gain/Loss
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {portfolio.map((stock) => {
              const value = stock.shares * stock.currentPrice;
              const gainLoss = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
              
              return (
                <tr key={stock.symbol}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stock.shares}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${stock.avgPrice.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${stock.currentPrice.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${value.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {gainLoss >= 0 ? '+' : ''}{gainLoss.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
          Add Stock
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
          Export
        </button>
      </div>
    </div>
  );
}

export default Portfolio; 