const express = require('express');
const { body, validationResult } = require('express-validator');
const SoftSkill = require('../models/SoftSkill');

const router = express.Router();

// Validation middleware
const validateSoftSkill = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill name is required and must be between 1 and 50 characters'),
  body('category')
    .isIn(['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Adaptability', 'Other'])
    .withMessage('Invalid category'),
  body('proficiency')
    .isInt({ min: 1, max: 100 })
    .withMessage('Proficiency must be between 1 and 100'),
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Icon cannot exceed 100 characters'),
  body('color')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Color cannot exceed 20 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer')
];

// GET all soft skills
router.get('/', async (req, res) => {
  try {
    const { active, category, sort = 'order' } = req.query;
    
    let query = {};
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    if (category) {
      query.category = category;
    }
    
    let sortOption = {};
    if (sort === 'order') {
      sortOption = { order: 1, name: 1 };
    } else if (sort === 'name') {
      sortOption = { name: 1 };
    } else if (sort === 'proficiency') {
      sortOption = { proficiency: -1 };
    } else if (sort === 'category') {
      sortOption = { category: 1, order: 1 };
    }

    const skills = await SoftSkill.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: skills.length,
      data: skills
    });
  } catch (error) {
    console.error('Error fetching soft skills:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch soft skills',
      error: error.message
    });
  }
});

// GET single soft skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await SoftSkill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        status: 'error',
        message: 'Soft skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: skill
    });
  } catch (error) {
    console.error('Error fetching soft skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch soft skill',
      error: error.message
    });
  }
});

// POST create new soft skill
router.post('/', validateSoftSkill, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const newSkill = await SoftSkill.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Soft skill created successfully',
      data: newSkill
    });
  } catch (error) {
    console.error('Error creating soft skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create soft skill',
      error: error.message
    });
  }
});

// PUT update soft skill
router.put('/:id', validateSoftSkill, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedSkill = await SoftSkill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Soft skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Soft skill updated successfully',
      data: updatedSkill
    });
  } catch (error) {
    console.error('Error updating soft skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update soft skill',
      error: error.message
    });
  }
});

// PATCH partial update soft skill
router.patch('/:id', async (req, res) => {
  try {
    const updatedSkill = await SoftSkill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Soft skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Soft skill updated successfully',
      data: updatedSkill
    });
  } catch (error) {
    console.error('Error updating soft skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update soft skill',
      error: error.message
    });
  }
});

// DELETE soft skill
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await SoftSkill.findByIdAndDelete(req.params.id);
    
    if (!deletedSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Soft skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Soft skill deleted successfully',
      data: deletedSkill
    });
  } catch (error) {
    console.error('Error deleting soft skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete soft skill',
      error: error.message
    });
  }
});

// GET active soft skills (for frontend display)
router.get('/active/skills', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const skills = await SoftSkill.find(query).sort({ order: 1, name: 1 });
    
    res.status(200).json({
      status: 'success',
      results: skills.length,
      data: skills
    });
  } catch (error) {
    console.error('Error fetching active soft skills:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch active soft skills',
      error: error.message
    });
  }
});

module.exports = router; 