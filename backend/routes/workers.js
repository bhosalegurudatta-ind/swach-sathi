const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all workers
// @route   GET /api/workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find({ active: true });
    res.status(200).json({
      success: true,
      count: workers.length,
      data: workers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
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
