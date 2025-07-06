const express = require('express');
const { body, validationResult } = require('express-validator');
const Certificate = require('../models/Certificate');

const router = express.Router();

// Validation middleware
const validateCertificate = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Certificate title is required and must be between 1 and 100 characters'),
  body('issuer')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Issuer is required and must be between 1 and 100 characters'),
  body('issueDate')
    .isISO8601()
    .withMessage('Issue date must be a valid date'),
  body('expiryDate')
    .optional()
    .isISO8601()
    .withMessage('Expiry date must be a valid date'),
  body('credentialId')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Credential ID cannot exceed 50 characters'),
  body('credentialUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Credential URL must be a valid URL'),
  body('category')
    .isIn(['Programming', 'Cloud', 'Database', 'Security', 'Project Management', 'Other'])
    .withMessage('Invalid category'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('image')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Image URL cannot exceed 200 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer')
];

// GET all certificates
router.get('/', async (req, res) => {
  try {
    const { active, category, sort = 'issueDate' } = req.query;
    
    let query = {};
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    if (category) {
      query.category = category;
    }
    
    let sortOption = {};
    if (sort === 'issueDate') {
      sortOption = { issueDate: -1 };
    } else if (sort === 'expiryDate') {
      sortOption = { expiryDate: -1 };
    } else if (sort === 'order') {
      sortOption = { order: 1, issueDate: -1 };
    } else if (sort === 'title') {
      sortOption = { title: 1 };
    } else if (sort === 'issuer') {
      sortOption = { issuer: 1 };
    }

    const certificates = await Certificate.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: certificates.length,
      data: certificates
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch certificates',
      error: error.message
    });
  }
});

// GET single certificate by ID
router.get('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        status: 'error',
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: certificate
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch certificate',
      error: error.message
    });
  }
});

// POST create new certificate
router.post('/', validateCertificate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const newCertificate = await Certificate.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Certificate created successfully',
      data: newCertificate
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create certificate',
      error: error.message
    });
  }
});

// PUT update certificate
router.put('/:id', validateCertificate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCertificate) {
      return res.status(404).json({
        status: 'error',
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Certificate updated successfully',
      data: updatedCertificate
    });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update certificate',
      error: error.message
    });
  }
});

// PATCH partial update certificate
router.patch('/:id', async (req, res) => {
  try {
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCertificate) {
      return res.status(404).json({
        status: 'error',
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Certificate updated successfully',
      data: updatedCertificate
    });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update certificate',
      error: error.message
    });
  }
});

// DELETE certificate
router.delete('/:id', async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
    
    if (!deletedCertificate) {
      return res.status(404).json({
        status: 'error',
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Certificate deleted successfully',
      data: deletedCertificate
    });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete certificate',
      error: error.message
    });
  }
});

// GET active certificates (for frontend display)
router.get('/active/certificates', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const certificates = await Certificate.find(query).sort({ order: 1, issueDate: -1 });
    
    res.status(200).json({
      status: 'success',
      results: certificates.length,
      data: certificates
    });
  } catch (error) {
    console.error('Error fetching active certificates:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch active certificates',
      error: error.message
    });
  }
});

// GET certificates by category
router.get('/category/:category', async (req, res) => {
  try {
    const certificates = await Certificate.find({ 
      category: req.params.category, 
      isActive: true 
    }).sort({ order: 1, issueDate: -1 });
    
    res.status(200).json({
      status: 'success',
      results: certificates.length,
      data: certificates
    });
  } catch (error) {
    console.error('Error fetching certificates by category:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch certificates by category',
      error: error.message
    });
  }
});

module.exports = router; 