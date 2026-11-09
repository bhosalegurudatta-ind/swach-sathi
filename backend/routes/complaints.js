const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { protect, authorize, optionalProtect } = require('../middleware/auth');

const fallbackHotspots = [
  {
    _id: 'c1',
    wasteType: 'Plastic',
    location: 'Alandi Bus Stand Terminal, Platform 2',
    description: 'Discarded plastic bottles, food wrappers, and single-use bags near waiting shelter.',
    priority: 'High',
    latitude: 18.6731,
    longitude: 73.8762,
    status: 'Pending',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    _id: 'c2',
    wasteType: 'Wet',
    location: 'Indrayani River Bank, Siddhabett Ghat',
    description: 'Rotting floral Nirmalya gathered at river steps requiring collection.',
    priority: 'Urgent',
    latitude: 18.6680,
    longitude: 73.8730,
    status: 'In Progress',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  },
  {
    _id: 'c3',
    wasteType: 'Dry',
    location: 'Market Road, Vegetable Mandi Entrance',
    description: 'Corrugated cartons and cardboard packaging debris spilling onto the sidewalk.',
    priority: 'Normal',
    latitude: 18.6718,
    longitude: 73.8789,
    status: 'In Progress',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    _id: 'c4',
    wasteType: 'Hazardous',
    location: 'Old Alandi Road, Near Medical Clinic',
    description: 'Broken medicine glass vials and packaging beside municipal dumpster.',
    priority: 'Urgent',
    latitude: 18.6690,
    longitude: 73.8768,
    status: 'Pending',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    _id: 'c5',
    wasteType: 'Wet',
    location: 'Vitthal Temple Chowk, Ward 1',
    description: 'Cleared community wet waste bin following morning pilgrimage sanitation routine.',
    priority: 'Normal',
    latitude: 18.6695,
    longitude: 73.8748,
    status: 'Resolved',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
  },
  {
    _id: 'c6',
    wasteType: 'Plastic',
    location: 'Alandi Municipal High School Zone',
    description: 'Cleaned school periphery waste bins, segregated plastic wrappers.',
    priority: 'Low',
    latitude: 18.6708,
    longitude: 73.8771,
    status: 'Resolved',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000)
  }
];

// @route   GET /api/complaints/map
// Public map hotspots: all complaints with geo coordinates
router.get('/map', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({ success: true, count: fallbackHotspots.length, data: fallbackHotspots });
  }

  try {
    const complaints = await Complaint.find({
      latitude: { $exists: true, $ne: null },
      longitude: { $exists: true, $ne: null }
    }).sort('-createdAt').limit(60);
    res.status(200).json({
      success: true,
      count: complaints.length > 0 ? complaints.length : fallbackHotspots.length,
      data: complaints.length > 0 ? complaints : fallbackHotspots
    });
  } catch (err) {
    res.status(200).json({ success: true, count: fallbackHotspots.length, data: fallbackHotspots });
  }
});

// @route   GET /api/complaints/track/:id
// Public tracking by Complaint ID (no login required)
router.get('/track/:id', async (req, res) => {
  const { id } = req.params;

  // If MongoDB is offline or using fallback
  if (mongoose.connection.readyState !== 1) {
    const found = fallbackHotspots.find(h => h._id === id || h.location.toLowerCase().includes(id.toLowerCase()));
    if (found) {
      return res.status(200).json({ success: true, data: found });
    }
    // Return sample mock tracking result so non-logged user gets an immediate demo
    return res.status(200).json({
      success: true,
      data: {
        _id: id,
        wasteType: 'Plastic & Organic',
        location: 'Near Devachi Alandi Chowk, Ward 1',
        description: 'Citizen filed waste clearance report.',
        priority: 'High',
        status: 'In Progress',
        assignedOfficer: 'Rajesh Kumar (Sanitation Supervisor)',
        assignedPhone: '+91 98220 12345',
        timeline: [
          { status: 'Grievance Registered', time: '10:15 AM Today', done: true },
          { status: 'Ward Team Dispatched', time: '10:45 AM Today', done: true },
          { status: 'Cleanup In Progress', time: '11:30 AM Today', done: true },
          { status: 'Final Inspection & Resolved', time: 'Estimated by 2:00 PM', done: false }
        ],
        createdAt: new Date(Date.now() - 3 * 3600 * 1000)
      }
    });
  }

  try {
    let complaint;
    if (mongoose.Types.ObjectId.isValid(id)) {
      complaint = await Complaint.findById(id).populate('user', 'name');
    }
    if (!complaint) {
      complaint = await Complaint.findOne({
        $or: [
          { location: { $regex: id, $options: 'i' } },
          { description: { $regex: id, $options: 'i' } }
        ]
      }).sort('-createdAt');
    }

    if (!complaint) {
      // If not found in DB, check fallback array
      const foundInFallback = fallbackHotspots.find(h => h._id === id || h.location.toLowerCase().includes(id.toLowerCase()));
      if (foundInFallback) {
        return res.status(200).json({ success: true, data: foundInFallback });
      }
      return res.status(404).json({ success: false, error: 'No grievance found with this reference number.' });
    }

    res.status(200).json({ success: true, data: complaint });
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
