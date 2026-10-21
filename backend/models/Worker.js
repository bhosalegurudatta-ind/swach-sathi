const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  role: {
    type: String,
    required: [true, 'Please add a role']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  area: {
    type: String,
    required: [true, 'Please add an area or ward']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200'
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Worker', WorkerSchema);
