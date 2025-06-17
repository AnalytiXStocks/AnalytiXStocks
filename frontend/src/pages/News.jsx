import React, { useState, useEffect } from 'react';
import { stockApi } from '../services/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Simulated API call - replace with actual API endpoint
      const response = await stockApi.getNews(selectedCategory);
      setNews(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'market', name: 'Market News' },
    { id: 'earnings', name: 'Earnings' },
    { id: 'ipo', name: 'IPO' },
    { id: 'mergers', name: 'Mergers & Acquisitions' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Market News</h1>

      {/* Category Filter */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{item.source}</span>
                <span className="mx-2">•</span>
                <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.summary}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {item.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News; 