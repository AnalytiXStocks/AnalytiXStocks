const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/portfolio
// @desc    Get user's portfolio
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // In a real application, you would fetch portfolio from a database
    // For now, let's return mock data
    const mockPortfolio = [
      { symbol: 'AAPL', shares: 10, avgPrice: 150.00, currentPrice: 175.00 },
      { symbol: 'GOOGL', shares: 5, avgPrice: 1000.00, currentPrice: 1100.00 },
      { symbol: 'MSFT', shares: 8, avgPrice: 250.00, currentPrice: 280.00 },
    ];
    res.json(mockPortfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/portfolio
// @desc    Add stock to portfolio
// @access  Private
router.post('/', auth, async (req, res) => {
  const { symbol, shares, avgPrice } = req.body;
  try {
    // In a real application, save to user's portfolio in database
    res.json({ msg: `Added ${shares} shares of ${symbol} to portfolio` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/portfolio/:symbol
// @desc    Update stock in portfolio
// @access  Private
router.put('/:symbol', auth, async (req, res) => {
  const { shares, avgPrice } = req.body;
  try {
    // In a real application, update stock in user's portfolio in database
    res.json({ msg: `Updated ${req.params.symbol} in portfolio` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/portfolio/:symbol
// @desc    Remove stock from portfolio
// @access  Private
router.delete('/:symbol', auth, async (req, res) => {
  try {
    // In a real application, remove stock from user's portfolio in database
    res.json({ msg: `Removed ${req.params.symbol} from portfolio` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 