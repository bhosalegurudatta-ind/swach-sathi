const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

// Helper to get token
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password, role: 'user' });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Please provide an email and password' });
  }

  // Graceful fallback for demo accounts if DB connection is disconnected
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    if (email === 'admin@swachhsathi.in' && password === 'admin123') {
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({ id: 'mock-admin-id', role: 'admin' }, process.env.JWT_SECRET || 'swachh_jwt_secret_2026', { expiresIn: '30d' });
      return res.status(200).json({
        success: true,
        token,
        user: { _id: 'mock-admin-id', name: 'Municipal Admin', email: 'admin@swachhsathi.in', role: 'admin' }
      });
    }
    if (email === 'citizen@alandi.in' && password === 'citizen123') {
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({ id: 'mock-citizen-id', role: 'user' }, process.env.JWT_SECRET || 'swachh_jwt_secret_2026', { expiresIn: '30d' });
      return res.status(200).json({
        success: true,
        token,
        user: { _id: 'mock-citizen-id', name: 'Aarav Patil', email: 'citizen@alandi.in', role: 'user' }
      });
    }
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   GET /api/auth/seed-admin
router.get('/seed-admin', async (req, res) => {
  try {
    if (!process.env.ADMIN_SEED_KEY || req.headers['x-admin-seed-key'] !== process.env.ADMIN_SEED_KEY) {
      return res.status(403).json({ success: false, error: 'Admin seeding is disabled without a configured seed key' });
    }
    const adminExists = await User.findOne({ email: 'admin@swachhsathi.in' });
    if (adminExists) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@swachhsathi.in',
      password: 'admin123',
      role: 'admin'
    });

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      credentials: {
        email: 'admin@swachhsathi.in',
        password: 'admin123'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
