const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/watchlist
// @desc    Get user's watchlist
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // In a real application, you would fetch watchlist from a database
    // For now, let's return mock data
    const mockWatchlist = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 175.00, change: 2.50, changePercent: 1.45 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 1100.00, change: -10.00, changePercent: -0.90 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 280.00, change: 3.10, changePercent: 1.12 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 135.00, change: -1.50, changePercent: -1.10 },
    ];
    res.json(mockWatchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/watchlist
// @desc    Add stock to watchlist
// @access  Private
router.post('/', auth, async (req, res) => {
  const { symbol } = req.body;
  try {
    // In a real application, save to user's watchlist in database
    res.json({ msg: `Added ${symbol} to watchlist` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/watchlist/:symbol
// @desc    Remove stock from watchlist
// @access  Private
router.delete('/:symbol', auth, async (req, res) => {
  try {
    // In a real application, remove stock from user's watchlist in database
    res.json({ msg: `Removed ${req.params.symbol} from watchlist` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 