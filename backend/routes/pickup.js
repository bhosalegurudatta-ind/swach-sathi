const express = require('express');
const router = express.Router();
const PickupRequest = require('../models/PickupRequest');
const User = require('../models/User');
const { protect, authorize, optionalProtect } = require('../middleware/auth');

// @route   GET /api/pickup
router.get('/', optionalProtect, async (req, res) => {
  try {
    let query;
    if (req.user && req.user.role === 'admin') {
      query = PickupRequest.find().populate('user', 'name email').sort('-createdAt');
    } else if (req.user) {
      query = PickupRequest.find({ user: req.user.id }).sort('-createdAt');
    } else {
      query = PickupRequest.find().sort('-createdAt').limit(10);
    }
    
    const requests = await query;
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   POST /api/pickup
router.post('/', optionalProtect, async (req, res) => {
  try {
    let userId = req.user ? req.user.id : null;
    if (!userId) {
      const citizen = await User.findOne({ email: 'citizen@alandi.in' });
      if (citizen) userId = citizen._id;
    }
    req.body.user = userId;
    const pickup = await PickupRequest.create(req.body);
    res.status(201).json({ success: true, data: pickup });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   PUT /api/pickup/:id
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let pickup = await PickupRequest.findById(req.params.id);
    if (!pickup) {
      return res.status(404).json({ success: false, error: 'Pickup request not found' });
    }

    pickup = await PickupRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: pickup });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
