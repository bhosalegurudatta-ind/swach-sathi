const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { protect, authorize, optionalProtect } = require('../middleware/auth');

// @route   GET /api/complaints/map
// Public map hotspots: all complaints with geo coordinates
router.get('/map', async (req, res) => {
  try {
    const complaints = await Complaint.find({
      latitude: { $exists: true, $ne: null },
      longitude: { $exists: true, $ne: null }
    }).sort('-createdAt').limit(60);
    res.status(200).json({ success: true, count: complaints.length, data: complaints });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   GET /api/complaints
router.get('/', optionalProtect, async (req, res) => {
  try {
    let query;
    if (req.user && req.user.role === 'admin') {
      query = Complaint.find().populate('user', 'name email').sort('-createdAt');
    } else if (req.user) {
      query = Complaint.find({ user: req.user.id }).sort('-createdAt');
    } else {
      // Public view
      query = Complaint.find().sort('-createdAt').limit(20);
    }
    
    const complaints = await query;
    res.status(200).json({ success: true, count: complaints.length, data: complaints });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   POST /api/complaints
router.post('/', optionalProtect, async (req, res) => {
  try {
    const { wasteType, location, description, imageUrl, priority, latitude, longitude } = req.body;
    let userId = req.user ? req.user.id : null;
    if (!userId) {
      const citizen = await User.findOne({ email: 'citizen@alandi.in' });
      if (citizen) userId = citizen._id;
    }
    const complaint = await Complaint.create({
      user: userId,
      wasteType: wasteType || 'Dry',
      location: location || 'Alandi Central',
      description: description || 'Citizen reported waste.',
      imageUrl: imageUrl || 'no-photo.jpg',
      priority: priority || 'Normal',
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined
    });
    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   PUT /api/complaints/:id
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, error: 'Complaint not found' });
    }

    complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
