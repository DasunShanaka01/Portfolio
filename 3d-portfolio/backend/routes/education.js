const express = require('express');
const { body, validationResult } = require('express-validator');
const Education = require('../models/Education');

const router = express.Router();

// Validation middleware
const validateEducation = [
  body('institution')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Institution name is required and must be between 1 and 100 characters'),
  body('degree')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Degree is required and must be between 1 and 100 characters'),
  body('field')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Field of study is required and must be between 1 and 100 characters'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('isCurrent')
    .optional()
    .isBoolean()
    .withMessage('isCurrent must be a boolean'),
  body('gpa')
    .optional()
    .isFloat({ min: 0, max: 4 })
    .withMessage('GPA must be between 0 and 4.0'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('achievements')
    .optional()
    .isArray()
    .withMessage('Achievements must be an array'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  body('logo')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Logo URL cannot exceed 200 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer')
];

// GET all education entries
router.get('/', async (req, res) => {
  try {
    const { active, sort = 'startDate' } = req.query;
    
    let query = {};
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    let sortOption = {};
    if (sort === 'startDate') {
      sortOption = { startDate: -1 };
    } else if (sort === 'endDate') {
      sortOption = { endDate: -1 };
    } else if (sort === 'order') {
      sortOption = { order: 1, startDate: -1 };
    } else if (sort === 'institution') {
      sortOption = { institution: 1 };
    }

    const education = await Education.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: education.length,
      data: education
    });
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch education',
      error: error.message
    });
  }
});

// GET single education entry by ID
router.get('/:id', async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({
        status: 'error',
        message: 'Education entry not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: education
    });
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch education',
      error: error.message
    });
  }
});

// POST create new education entry
router.post('/', validateEducation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const newEducation = await Education.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Education entry created successfully',
      data: newEducation
    });
  } catch (error) {
    console.error('Error creating education:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create education entry',
      error: error.message
    });
  }
});

// PUT update education entry
router.put('/:id', validateEducation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedEducation) {
      return res.status(404).json({
        status: 'error',
        message: 'Education entry not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Education entry updated successfully',
      data: updatedEducation
    });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update education entry',
      error: error.message
    });
  }
});

// PATCH partial update education entry
router.patch('/:id', async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedEducation) {
      return res.status(404).json({
        status: 'error',
        message: 'Education entry not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Education entry updated successfully',
      data: updatedEducation
    });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update education entry',
      error: error.message
    });
  }
});

// DELETE education entry
router.delete('/:id', async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    
    if (!deletedEducation) {
      return res.status(404).json({
        status: 'error',
        message: 'Education entry not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Education entry deleted successfully',
      data: deletedEducation
    });
  } catch (error) {
    console.error('Error deleting education:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete education entry',
      error: error.message
    });
  }
});

// GET active education entries (for frontend display)
router.get('/active/education', async (req, res) => {
  try {
    const education = await Education.find({ isActive: true }).sort({ order: 1, startDate: -1 });
    
    res.status(200).json({
      status: 'success',
      results: education.length,
      data: education
    });
  } catch (error) {
    console.error('Error fetching active education:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch active education',
      error: error.message
    });
  }
});

module.exports = router; 