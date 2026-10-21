const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/events
router.get('/', async (req, res) => {
  try {
    // Show only approved events to public
    let filter = { status: 'Approved' };
    
    // If admin is requesting, show all events
    if (req.query.all === 'true') {
      filter = {};
    }

    const events = await Event.find(filter).populate('organizer', 'name email');
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
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
