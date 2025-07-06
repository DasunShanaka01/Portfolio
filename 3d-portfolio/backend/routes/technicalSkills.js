const express = require('express');
const { body, validationResult } = require('express-validator');
const TechnicalSkill = require('../models/TechnicalSkill');

const router = express.Router();

// Validation middleware
const validateTechnicalSkill = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill name is required and must be between 1 and 50 characters'),
  body('category')
    .isIn(['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'])
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

// GET all technical skills
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

    const skills = await TechnicalSkill.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: skills.length,
      data: skills
    });
  } catch (error) {
    console.error('Error fetching technical skills:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch technical skills',
      error: error.message
    });
  }
});

// GET single technical skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await TechnicalSkill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        status: 'error',
        message: 'Technical skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: skill
    });
  } catch (error) {
    console.error('Error fetching technical skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch technical skill',
      error: error.message
    });
  }
});

// POST create new technical skill
router.post('/', validateTechnicalSkill, async (req, res) => {
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

    const newSkill = await TechnicalSkill.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Technical skill created successfully',
      data: newSkill
    });
  } catch (error) {
    console.error('Error creating technical skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create technical skill',
      error: error.message
    });
  }
});

// PUT update technical skill
router.put('/:id', validateTechnicalSkill, async (req, res) => {
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

    const updatedSkill = await TechnicalSkill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Technical skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Technical skill updated successfully',
      data: updatedSkill
    });
  } catch (error) {
    console.error('Error updating technical skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update technical skill',
      error: error.message
    });
  }
});

// PATCH partial update technical skill
router.patch('/:id', async (req, res) => {
  try {
    const updatedSkill = await TechnicalSkill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Technical skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Technical skill updated successfully',
      data: updatedSkill
    });
  } catch (error) {
    console.error('Error updating technical skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update technical skill',
      error: error.message
    });
  }
});

// DELETE technical skill
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await TechnicalSkill.findByIdAndDelete(req.params.id);
    
    if (!deletedSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Technical skill not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Technical skill deleted successfully',
      data: deletedSkill
    });
  } catch (error) {
    console.error('Error deleting technical skill:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete technical skill',
      error: error.message
    });
  }
});

// GET active technical skills (for frontend display)
router.get('/active/skills', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const skills = await TechnicalSkill.find(query).sort({ order: 1, name: 1 });
    
    res.status(200).json({
      status: 'success',
      results: skills.length,
      data: skills
    });
  } catch (error) {
    console.error('Error fetching active technical skills:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch active technical skills',
      error: error.message
    });
  }
});

// GET skills by category
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await TechnicalSkill.find({ 
      category: req.params.category, 
      isActive: true 
    }).sort({ order: 1, name: 1 });
    
    res.status(200).json({
      status: 'success',
      results: skills.length,
      data: skills
    });
  } catch (error) {
    console.error('Error fetching skills by category:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch skills by category',
      error: error.message
    });
  }
});

module.exports = router; 