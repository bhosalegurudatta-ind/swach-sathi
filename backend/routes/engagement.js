const express = require('express');
const router = express.Router();
const Engagement = require('../models/Engagement');
const Comment = require('../models/Comment');

// Get global engagement stats
router.get('/', async (req, res) => {
  try {
    let stats = await Engagement.findOne({ key: 'global_stats' });
    if (!stats) {
      stats = await Engagement.create({ key: 'global_stats', views: 0, likes: 0 });
    }
    const comments = await Comment.find().sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, views: stats.views, likes: stats.likes, comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Increment views
router.post('/view', async (req, res) => {
  try {
    const stats = await Engagement.findOneAndUpdate(
      { key: 'global_stats' },
      { $inc: { views: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, views: stats.views });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Increment likes
router.post('/like', async (req, res) => {
  try {
    const stats = await Engagement.findOneAndUpdate(
      { key: 'global_stats' },
      { $inc: { likes: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, likes: stats.likes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Post comment
router.post('/comment', async (req, res) => {
  try {
    const { name, text } = req.body;
    const comment = await Comment.create({ name, text });
    res.json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
