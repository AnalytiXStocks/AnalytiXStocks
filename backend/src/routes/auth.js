const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get current user (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Logout user (optional - client-side token removal is usually sufficient)
router.post('/logout', (req, res) => {
  // In a real application, you might invalidate the JWT on the server side
  // For now, client-side token removal is sufficient for stateless JWTs
  res.json({ msg: 'Logged out successfully' });
});

// Update user profile (protected)
router.put('/profile', auth, async (req, res) => {
  const { name, email } = req.body;
  const newProfile = {};
  if (name) newProfile.name = name;
  if (email) newProfile.email = email;

  try {
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: newProfile },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user password (protected)
router.put('/password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Current Password' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Forgot Password (send reset link)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // In a real app, generate a reset token and send email with link
    res.json({ msg: 'Password reset link sent to your email (simulated)' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    // In a real app, verify the token and reset password
    res.json({ msg: 'Password has been reset successfully (simulated)' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Email Verification (simulated)
router.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  try {
    // In a real app, verify the token and mark email as verified
    res.json({ msg: 'Email verified successfully (simulated)' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 