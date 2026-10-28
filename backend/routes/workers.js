const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Worker = require('../models/Worker');
const { protect, authorize } = require('../middleware/auth');

const fallbackWorkers = [
  {
    name: 'Rajesh Kumar',
    role: 'Sanitation Supervisor',
    phone: '+91 98220 12345',
    area: 'Ward 1 - Devachi Alandi & Temple Complex',
    image: 'images/workers/worker1.jpg',
    active: true
  },
  {
    name: 'Sunita Deshmukh',
    role: 'Waste Collection Lead',
    phone: '+91 98220 23456',
    area: 'Ward 2 - Indrayani River Ghat & Pilgrim Corridor',
    image: 'images/workers/worker2.jpg',
    active: true
  },
  {
    name: 'Prakash Shinde',
    role: 'Dry Waste Operations',
    phone: '+91 98220 34567',
    area: 'Ward 3 - Market Road & Vegetable Mandi',
    image: 'images/workers/worker3.jpg',
    active: true
  },
  {
    name: 'Kavita Jadhav',
    role: 'Residential Zone In-Charge',
    phone: '+91 98220 45678',
    area: 'Ward 4 - Dehu Phata & Chakan Road',
    image: 'images/workers/worker4.jpg',
    active: true
  },
  {
    name: 'Suresh More',
    role: 'Composting & Wet Waste Inspector',
    phone: '+91 98220 56789',
    area: 'Ward 5 - Vadgaon Ghenand Road',
    image: 'images/workers/worker5.jpg',
    active: true
  },
  {
    name: 'Anjali Gaikwad',
    role: 'Emergency Cleanliness Wing',
    phone: '+91 98220 67890',
    area: 'Ward 6 - Shivaji Chowk & Bus Station Zone',
    image: 'images/workers/worker6.jpg',
    active: true
  }
];

// @desc    Get all workers
// @route   GET /api/workers
router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({
      success: true,
      count: fallbackWorkers.length,
      data: fallbackWorkers
    });
  }

  try {
    const workers = await Worker.find({ active: true });
    res.status(200).json({
      success: true,
      count: workers.length > 0 ? workers.length : fallbackWorkers.length,
      data: workers.length > 0 ? workers : fallbackWorkers
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      count: fallbackWorkers.length,
      data: fallbackWorkers
    });
  }
});

// @desc    Create a worker (for initial setup/admin)
// @route   POST /api/workers
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json({
      success: true,
      data: worker
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Seed workers if none exist
router.post('/seed', protect, authorize('admin'), async (req, res) => {
  try {
    const count = await Worker.countDocuments();
    if (count > 0) {
      return res.status(400).json({ success: false, message: 'Database already seeded' });
    }

    const seedWorkers = [
      {
        name: 'Rajesh Kumar',
        role: 'Sanitation Supervisor',
        phone: '+91 98765 43210',
        area: 'Alandi Devachi (Ward 1)',
        image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        name: 'Sunita Deshmukh',
        role: 'Waste Collection Lead',
        phone: '+91 98765 43211',
        area: 'Indrayani River Side (Ward 2)',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        name: 'Amit Patil',
        role: 'Health Inspector',
        phone: '+91 98765 43212',
        area: 'Market Road (Ward 3)',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        name: 'Priya Shinde',
        role: 'Community Outreach',
        phone: '+91 98765 43213',
        area: 'Residential Area (Ward 4)',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ];

    await Worker.insertMany(seedWorkers);
    res.status(201).json({ success: true, message: 'Workers seeded successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
