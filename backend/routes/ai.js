const express = require('express');
const router = express.Router();

// Simulated AI Waste Dataset
const wasteDataset = {
  'plastic bottle': { type: 'Plastic', method: 'Recycle bin' },
  'banana peel': { type: 'Wet', method: 'Compost bin' },
  'apple core': { type: 'Wet', method: 'Compost bin' },
  'glass jar': { type: 'Dry', method: 'Recycle bin (Glass)' },
  'battery': { type: 'Hazardous', method: 'E-waste or hazardous collection center' },
  'cardboard': { type: 'Dry', method: 'Recycle bin (Paper/Cardboard)' },
  'newspaper': { type: 'Dry', method: 'Recycle bin (Paper)' },
  'food wrapper': { type: 'Plastic', method: 'Recycle bin / General Waste depending on material' },
  'tin can': { type: 'Dry', method: 'Recycle bin (Metal)' },
  'diaper': { type: 'Hazardous', method: 'General Waste (sealed)' }
};

// @route   POST /api/ai/segregate
router.post('/segregate', (req, res) => {
  try {
    const { item } = req.body;
    
    if (!item) {
      return res.status(400).json({ success: false, error: 'Please provide an item to analyze' });
    }

    const searchItem = item.toLowerCase().trim();
    let result = null;

    // Simple matching
    for (const [key, value] of Object.entries(wasteDataset)) {
      if (searchItem.includes(key) || key.includes(searchItem)) {
        result = value;
        break;
      }
    }

    if (result) {
      res.status(200).json({
        success: true,
        data: {
          item: item,
          wasteType: result.type,
          disposalMethod: result.method
        }
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          item: item,
          wasteType: 'Other',
          disposalMethod: 'Please check local guidelines or dispose in general waste bin'
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
