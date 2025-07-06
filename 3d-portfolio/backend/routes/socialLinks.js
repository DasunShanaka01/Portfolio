const express = require('express');
const { body, validationResult } = require('express-validator');
const SocialLink = require('../models/SocialLink');

const router = express.Router();

// Validation middleware
const validateSocialLink = [
  body('platform')
    .isIn(['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'YouTube', 'Portfolio', 'Blog', 'Other'])
    .withMessage('Invalid platform'),
  body('url')
    .trim()
    .isURL()
    .withMessage('URL must be a valid URL'),
  body('username')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Username cannot exceed 100 characters'),
  body('displayName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Display name cannot exceed 100 characters'),
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
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer')
];

// GET all social links
router.get('/', async (req, res) => {
  try {
    const { active, platform, sort = 'order' } = req.query;
    
    let query = {};
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    if (platform) {
      query.platform = platform;
    }
    
    let sortOption = {};
    if (sort === 'order') {
      sortOption = { order: 1, platform: 1 };
    } else if (sort === 'platform') {
      sortOption = { platform: 1, order: 1 };
    } else if (sort === 'displayName') {
      sortOption = { displayName: 1 };
    } else if (sort === 'createdAt') {
      sortOption = { createdAt: -1 };
    }

    const socialLinks = await SocialLink.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: socialLinks.length,
      data: socialLinks
    });
  } catch (error) {
    console.error('Error fetching social links:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch social links',
      error: error.message
    });
  }
});

// GET single social link by ID
router.get('/:id', async (req, res) => {
  try {
    const socialLink = await SocialLink.findById(req.params.id);
    
    if (!socialLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Social link not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: socialLink
    });
  } catch (error) {
    console.error('Error fetching social link:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch social link',
      error: error.message
    });
  }
});

// POST create new social link
router.post('/', validateSocialLink, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const newSocialLink = await SocialLink.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Social link created successfully',
      data: newSocialLink
    });
  } catch (error) {
    console.error('Error creating social link:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create social link',
      error: error.message
    });
  }
});

// PUT update social link
router.put('/:id', validateSocialLink, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedSocialLink = await SocialLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSocialLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Social link not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Social link updated successfully',
      data: updatedSocialLink
    });
  } catch (error) {
    console.error('Error updating social link:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update social link',
      error: error.message
    });
  }
});

// PATCH partial update social link
router.patch('/:id', async (req, res) => {
  try {
    const updatedSocialLink = await SocialLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSocialLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Social link not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Social link updated successfully',
      data: updatedSocialLink
    });
  } catch (error) {
    console.error('Error updating social link:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update social link',
      error: error.message
    });
  }
});

// DELETE social link
router.delete('/:id', async (req, res) => {
  try {
    const deletedSocialLink = await SocialLink.findByIdAndDelete(req.params.id);
    
    if (!deletedSocialLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Social link not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Social link deleted successfully',
      data: deletedSocialLink
    });
  } catch (error) {
    console.error('Error deleting social link:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete social link',
      error: error.message
    });
  }
});

// GET active social links (for frontend display)
router.get('/active/links', async (req, res) => {
  try {
    const { platform } = req.query;
    
    let query = { isActive: true };
    if (platform) {
      query.platform = platform;
    }
    
    const socialLinks = await SocialLink.find(query).sort({ order: 1, platform: 1 });
    
    res.status(200).json({
      status: 'success',
      results: socialLinks.length,
      data: socialLinks
    });
  } catch (error) {
    console.error('Error fetching active social links:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch active social links',
      error: error.message
    });
  }
});

// GET social links by platform
router.get('/platform/:platform', async (req, res) => {
  try {
    const socialLinks = await SocialLink.find({ 
      platform: req.params.platform, 
      isActive: true 
    }).sort({ order: 1 });
    
    res.status(200).json({
      status: 'success',
      results: socialLinks.length,
      data: socialLinks
    });
  } catch (error) {
    console.error('Error fetching social links by platform:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch social links by platform',
      error: error.message
    });
  }
});

module.exports = router; 