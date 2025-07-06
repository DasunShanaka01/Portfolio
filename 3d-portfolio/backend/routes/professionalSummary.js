const express = require('express');
const { body, validationResult } = require('express-validator');
const ProfessionalSummary = require('../models/ProfessionalSummary');

const router = express.Router();

// Validation middleware
const validateProfessionalSummary = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be between 1 and 100 characters'),
  body('summary')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Summary is required and must be between 1 and 2000 characters'),
  body('experience')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Experience is required'),
  body('location')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Location is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Phone number is required'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer')
];

// GET all professional summaries
router.get('/', async (req, res) => {
  try {
    const { active, sort = 'order' } = req.query;
    
    let query = {};
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    let sortOption = {};
    if (sort === 'order') {
      sortOption = { order: 1, createdAt: -1 };
    } else if (sort === 'created') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'updated') {
      sortOption = { updatedAt: -1 };
    }

    const summaries = await ProfessionalSummary.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: summaries.length,
      data: summaries
    });
  } catch (error) {
    console.error('Error fetching professional summaries:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch professional summaries',
      error: error.message
    });
  }
});

// GET single professional summary by ID
router.get('/:id', async (req, res) => {
  try {
    const summary = await ProfessionalSummary.findById(req.params.id);
    
    if (!summary) {
      return res.status(404).json({
        status: 'error',
        message: 'Professional summary not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    console.error('Error fetching professional summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch professional summary',
      error: error.message
    });
  }
});

// POST create new professional summary
router.post('/', validateProfessionalSummary, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const newSummary = await ProfessionalSummary.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Professional summary created successfully',
      data: newSummary
    });
  } catch (error) {
    console.error('Error creating professional summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create professional summary',
      error: error.message
    });
  }
});

// PUT update professional summary
router.put('/:id', validateProfessionalSummary, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedSummary = await ProfessionalSummary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSummary) {
      return res.status(404).json({
        status: 'error',
        message: 'Professional summary not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Professional summary updated successfully',
      data: updatedSummary
    });
  } catch (error) {
    console.error('Error updating professional summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update professional summary',
      error: error.message
    });
  }
});

// PATCH partial update professional summary
router.patch('/:id', async (req, res) => {
  try {
    const updatedSummary = await ProfessionalSummary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSummary) {
      return res.status(404).json({
        status: 'error',
        message: 'Professional summary not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Professional summary updated successfully',
      data: updatedSummary
    });
  } catch (error) {
    console.error('Error updating professional summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update professional summary',
      error: error.message
    });
  }
});

// DELETE professional summary
router.delete('/:id', async (req, res) => {
  try {
    const deletedSummary = await ProfessionalSummary.findByIdAndDelete(req.params.id);
    
    if (!deletedSummary) {
      return res.status(404).json({
        status: 'error',
        message: 'Professional summary not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Professional summary deleted successfully',
      data: deletedSummary
    });
  } catch (error) {
    console.error('Error deleting professional summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete professional summary',
      error: error.message
    });
  }
});

// GET active professional summary (for frontend display)
router.get('/active/summary', async (req, res) => {
  try {
    const summary = await ProfessionalSummary.findOne({ isActive: true }).sort({ order: 1 });
    
    if (!summary) {
      return res.status(404).json({
        status: 'error',
        message: 'No active professional summary found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    console.error('Error fetching active professional summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch active professional summary',
      error: error.message
    });
  }
});

module.exports = router; 