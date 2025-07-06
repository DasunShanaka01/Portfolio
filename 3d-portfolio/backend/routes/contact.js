const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Subject is required and must be between 1 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message is required and must be between 1 and 2000 characters'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters')
];

// GET all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const { read, replied, sort = 'createdAt' } = req.query;
    
    let query = {};
    if (read !== undefined) {
      query.isRead = read === 'true';
    }
    if (replied !== undefined) {
      query.isReplied = replied === 'true';
    }
    
    let sortOption = {};
    if (sort === 'createdAt') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'updatedAt') {
      sortOption = { updatedAt: -1 };
    } else if (sort === 'name') {
      sortOption = { name: 1 };
    } else if (sort === 'email') {
      sortOption = { email: 1 };
    }

    const contacts = await Contact.find(query).sort(sortOption);
    
    res.status(200).json({
      status: 'success',
      results: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact',
      error: error.message
    });
  }
});

// POST create new contact submission
router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add IP address and user agent
    const contactData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    const newContact = await Contact.create(contactData);
    
    res.status(201).json({
      status: 'success',
      message: 'Contact message sent successfully',
      data: newContact
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send contact message',
      error: error.message
    });
  }
});

// PATCH mark contact as read
router.patch('/:id/read', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Contact marked as read',
      data: updatedContact
    });
  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to mark contact as read',
      error: error.message
    });
  }
});

// PATCH mark contact as replied
router.patch('/:id/replied', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isReplied: true },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Contact marked as replied',
      data: updatedContact
    });
  } catch (error) {
    console.error('Error marking contact as replied:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to mark contact as replied',
      error: error.message
    });
  }
});

// DELETE contact submission
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Contact deleted successfully',
      data: deletedContact
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete contact',
      error: error.message
    });
  }
});

// GET unread contacts count
router.get('/stats/unread', async (req, res) => {
  try {
    const unreadCount = await Contact.countDocuments({ isRead: false });
    const unrepliedCount = await Contact.countDocuments({ isReplied: false });
    const totalCount = await Contact.countDocuments();
    
    res.status(200).json({
      status: 'success',
      data: {
        unread: unreadCount,
        unreplied: unrepliedCount,
        total: totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact stats',
      error: error.message
    });
  }
});

module.exports = router; 