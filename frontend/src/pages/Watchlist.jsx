import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchWatchlist = async () => {
      try {
        // Simulated watchlist data
        const mockWatchlist = [
          { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.5, changePercent: 1.45 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2950.75, change: -15.25, changePercent: -0.51 },
          { symbol: 'MSFT', name: 'Microsoft Corp.', price: 310.25, change: 5.75, changePercent: 1.89 },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3450.00, change: 25.50, changePercent: 0.74 }
        ];
        
        setWatchlist(mockWatchlist);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        setError('Failed to load watchlist');
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!newSymbol) return;

    try {
      // TODO: Replace with actual API call
      const mockNewStock = {
        symbol: newSymbol.toUpperCase(),
        name: `${newSymbol.toUpperCase()} Company`,
        price: 100.00,
        change: 0,
        changePercent: 0
      };

      setWatchlist([...watchlist, mockNewStock]);
      setNewSymbol('');
    } catch (error) {
      console.error('Error adding stock:', error);
      setError('Failed to add stock to watchlist');
    }
  };

  const handleRemoveStock = (symbol) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

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
        <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
        <form onSubmit={handleAddStock} className="flex gap-2">
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            placeholder="Add stock symbol"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Add
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {watchlist.map((stock) => (
              <tr key={stock.symbol}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{stock.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${stock.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleRemoveStock(stock.symbol)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Watchlist; 