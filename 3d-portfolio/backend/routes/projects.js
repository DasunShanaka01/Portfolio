const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');

const router = express.Router();

// Validation middleware
const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Project title is required and must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Project description is required and must be between 1 and 1000 characters'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),
  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),
  body('category')
    .isIn(['Web Development', 'Mobile App', 'Desktop App', 'API', 'Game', 'Other'])
    .withMessage('Invalid category'),
  body('image')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Image URL cannot exceed 200 characters'),
  body('liveUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('githubUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('demoUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Demo URL must be a valid URL'),
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
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  body('challenges')
    .optional()
    .isArray()
    .withMessage('Challenges must be an array'),
  body('solutions')
    .optional()
    .isArray()
    .withMessage('Solutions must be an array'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer')
];

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { active, category, sort = 'startDate' } = req.query;
    
    let query = {};
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    if (category) {
      query.category = category;
    }
    
    let sortOption = {};
    if (sort === 'startDate') {
      sortOption = { startDate: -1 };
    } else if (sort === 'endDate') {
      sortOption = { endDate: -1 };
    } else if (sort === 'order') {
      sortOption = { order: 1, startDate: -1 };
    } else if (sort === 'title') {
      sortOption = { title: 1 };
    } else if (sort === 'category') {
      sortOption = { category: 1, order: 1 };
    }

    const projects = await Project.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
});

// GET single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch project',
      error: error.message
    });
  }
});

// POST create new project
router.post('/', validateProject, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const newProject = await Project.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create project',
      error: error.message
    });
  }
});

// PUT update project
router.put('/:id', validateProject, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update project',
      error: error.message
    });
  }
});

// PATCH partial update project
router.patch('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update project',
      error: error.message
    });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully',
      data: deletedProject
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete project',
      error: error.message
    });
  }
});

// GET active projects (for frontend display)
router.get('/active/projects', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const projects = await Project.find(query).sort({ order: 1, startDate: -1 });
    
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching active projects:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch active projects',
      error: error.message
    });
  }
});

// GET projects by category
router.get('/category/:category', async (req, res) => {
  try {
    const projects = await Project.find({ 
      category: req.params.category, 
      isActive: true 
    }).sort({ order: 1, startDate: -1 });
    
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch projects by category',
      error: error.message
    });
  }
});

module.exports = router; 