import React from 'react';
import { Link } from 'react-router-dom';

const StockCard = ({ stock }) => {
  const {
    symbol,
    name,
    price,
    change,
    changePercent,
    volume,
    marketCap,
    peRatio,
  } = stock;

  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{symbol}</h3>
          <p className="text-sm text-gray-600">{name}</p>
        </div>
        <Link
          to={`/analysis/${symbol}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
          <p
            className={`text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? '+' : ''}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Volume</p>
            <p className="font-medium text-gray-900">
              {volume.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Market Cap</p>
            <p className="font-medium text-gray-900">
              ${(marketCap / 1e9).toFixed(2)}B
            </p>
          </div>
          <div>
            <p className="text-gray-600">P/E Ratio</p>
            <p className="font-medium text-gray-900">{peRatio.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard; 