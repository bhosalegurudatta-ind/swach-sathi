const mongoose = require('mongoose');

const LitterReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please upload an image']
  },
  isFaceBlurred: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['Pending Verification', 'Verified', 'Rejected'],
    default: 'Pending Verification'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LitterReport', LitterReportSchema);
