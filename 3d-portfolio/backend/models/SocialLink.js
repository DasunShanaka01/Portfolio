const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, 'Platform is required'],
    enum: ['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'YouTube', 'Portfolio', 'Blog', 'Other'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true
  },
  username: {
    type: String,
    trim: true,
    maxlength: [100, 'Username cannot exceed 100 characters']
  },
  displayName: {
    type: String,
    trim: true,
    maxlength: [100, 'Display name cannot exceed 100 characters']
  },
  icon: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#667eea',
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
socialLinkSchema.index({ platform: 1, isActive: 1, order: 1 });

module.exports = mongoose.model('SocialLink', socialLinkSchema); 