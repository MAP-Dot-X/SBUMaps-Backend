const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
    index: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  relatedEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    index: true
  },
  attachments: [{
    filename: String,
    url: String,
    contentType: String
  }],
  comments: [{
    text: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    index: true
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date
});

// Compound index for efficient querying
issueSchema.index({ status: 1, priority: 1, createdAt: -1 });

// Text index for full-text search
issueSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to update the 'updatedAt' field
issueSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;