const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
  key: { type: String, default: 'global_stats' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Engagement', EngagementSchema);
