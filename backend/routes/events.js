const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/Event');
const { protect, authorize } = require('../middleware/auth');

const fallbackEvents = [
  {
    _id: 'e1',
    title: '🌊 Indrayani River Mega Cleanup Drive',
    location: 'Indrayani River Bank, Alandi Ghat',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    description: 'Join 250+ volunteers and Alandi municipality for a riverfront cleanup and plastic removal drive.',
    status: 'Approved'
  },
  {
    _id: 'e2',
    title: '🌸 Temple Corridor Zero-Plastic Campaign',
    location: 'Sant Dnyaneshwar Maharaj Sanjeevan Samadhi Chowk',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    description: 'Distributing compostable cloth bags and collecting floral waste (Nirmalya) for composting.',
    status: 'Approved'
  },
  {
    _id: 'e3',
    title: '🌳 Clean & Green Ward 4 Plantation & Segregation',
    location: 'Dehu Phata Community Center, Alandi',
    date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    description: 'Planting 300 native saplings and conducting doorstep wet/dry waste segregation awareness.',
    status: 'Approved'
  }
];

// @route   GET /api/events
router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({ success: true, count: fallbackEvents.length, data: fallbackEvents });
  }

  try {
    // Show only approved events to public
    let filter = { status: 'Approved' };
    
    // If admin is requesting, show all events
    if (req.query.all === 'true') {
      filter = {};
    }

    const events = await Event.find(filter).populate('organizer', 'name email');
    res.status(200).json({
      success: true,
      count: events.length > 0 ? events.length : fallbackEvents.length,
      data: events.length > 0 ? events : fallbackEvents
    });
  } catch (err) {
    res.status(200).json({ success: true, count: fallbackEvents.length, data: fallbackEvents });
  }
});

// @route   POST /api/events
router.post('/', protect, async (req, res) => {
  try {
    req.body.organizer = req.user.id;
    // Admins can create pre-approved events
    if (req.user.role === 'admin') {
      req.body.status = 'Approved';
    }
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   PUT /api/events/:id
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
