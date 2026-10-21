const express = require('express');
const router = express.Router();
const LitterReport = require('../models/LitterReport');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/litter
router.get('/', protect, async (req, res) => {
  try {
    let query;
    if (req.user.role === 'admin') {
      query = LitterReport.find().populate('user', 'name email');
    } else {
      query = LitterReport.find({ user: req.user.id });
    }
    
    const reports = await query;
    res.status(200).json({ success: true, count: reports.length, data: reports });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   POST /api/litter
router.post('/', protect, async (req, res) => {
  try {
    req.body.user = req.user.id;
    // Simulate face blur privacy
    req.body.isFaceBlurred = true; 
    
    const report = await LitterReport.create(req.body);
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   PUT /api/litter/:id
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let report = await LitterReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    report = await LitterReport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
