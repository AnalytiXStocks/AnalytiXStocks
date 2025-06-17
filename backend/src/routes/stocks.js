const express = require('express');
const router = express.Router();
const axios = require('axios');

// Alpha Vantage API Key
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// @route   GET /api/stocks/quote/:symbol
// @desc    Get real-time stock quote
// @access  Public (for now, will be protected later)
router.get('/quote/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const data = response.data['Global Quote'];

    if (data && Object.keys(data).length > 0) {
      const quote = {
        symbol: data['01. symbol'],
        open: parseFloat(data['02. open']),
        high: parseFloat(data['03. high']),
        low: parseFloat(data['04. low']),
        price: parseFloat(data['05. price']),
        volume: parseInt(data['06. volume']),
        latestTradingDay: data['07. latest trading day'],
        previousClose: parseFloat(data['08. previous close']),
        change: parseFloat(data['09. change']),
        changePercent: parseFloat(data['10. change percent']),
      };
      res.json(quote);
    } else {
      res.status(404).json({ msg: 'Stock not found or invalid symbol' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/stocks/historical/:symbol
// @desc    Get historical stock data
// @access  Public (for now)
router.get('/historical/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        outputsize: 'compact', // or 'full'
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const timeSeries = response.data['Time Series (Daily)'];

    if (timeSeries) {
      const historicalData = Object.keys(timeSeries).map(date => ({
        date: date,
        open: parseFloat(timeSeries[date]['1. open']),
        high: parseFloat(timeSeries[date]['2. high']),
        low: parseFloat(timeSeries[date]['3. low']),
        close: parseFloat(timeSeries[date]['4. close']),
        volume: parseInt(timeSeries[date]['5. volume']),
      }));
      res.json(historicalData);
    } else {
      res.status(404).json({ msg: 'Historical data not found or invalid symbol' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/stocks/search
// @desc    Search for stocks
// @access  Public (for now)
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ msg: 'Search query is required' });
    }

    const response = await axios.get(BASE_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: query,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const bestMatches = response.data.bestMatches;

    if (bestMatches && bestMatches.length > 0) {
      const searchResults = bestMatches.map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        marketOpen: match['5. marketOpen'],
        marketClose: match['6. marketClose'],
        timezone: match['7. timezone'],
        currency: match['8. currency'],
        matchScore: parseFloat(match['9. matchScore']),
      }));
      res.json(searchResults);
    } else {
      res.status(404).json({ msg: 'No matching stocks found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/stocks/news
// @desc    Get market news
// @access  Public (for now)
router.get('/news', async (req, res) => {
  try {
    const category = req.query.category || 'general';
    // Simulated news data - in a real app, integrate with a news API (e.g., NewsAPI, Finnhub)
    const mockNews = [
      { id: '1', title: 'Market rebounds on tech gains', summary: 'Major tech companies saw significant gains...', source: 'Financial Times', publishedAt: '2023-10-26T10:00:00Z', image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=MarketNews', url: '#', categories: ['market'] },
      { id: '2', title: 'Company X announces strong earnings', summary: 'Earnings exceeded expectations...', source: 'Reuters', publishedAt: '2023-10-25T15:30:00Z', image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Earnings', url: '#', categories: ['earnings'] },
      { id: '3', title: 'New IPO set to launch next month', summary: 'A promising startup is going public...', source: 'Bloomberg', publishedAt: '2023-10-24T09:00:00Z', image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=IPO', url: '#', categories: ['ipo', 'tech'] },
      { id: '4', title: 'Merger talks between giants ongoing', summary: 'Two industry leaders are in advanced discussions...', source: 'Wall Street Journal', publishedAt: '2023-10-23T11:00:00Z', image: 'https://via.placeholder.com/150/FFFF00/000000?text=Mergers', url: '#', categories: ['mergers'] },
    ];

    if (category === 'all' || category === 'general') {
      res.json(mockNews);
    } else {
      res.json(mockNews.filter(newsItem => newsItem.categories.includes(category)));
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 