const mongoose = require('mongoose');

const PickupRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  wasteType: {
    type: String,
    enum: ['Wet', 'Dry', 'Plastic', 'Hazardous', 'Other'],
    required: [true, 'Please select a waste type']
  },
  date: {
    type: Date,
    required: [true, 'Please select a date']
  },
  time: {
    type: String,
    required: [true, 'Please select a time slot']
  },
  address: {
    type: String,
    required: [true, 'Please provide pickup address']
  },
  status: {
    type: String,
    enum: ['Requested', 'Assigned', 'Completed'],
    default: 'Requested'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PickupRequest', PickupRequestSchema);
