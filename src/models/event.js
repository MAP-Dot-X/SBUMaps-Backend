const mongoose = require('mongoose');

const eventTimeSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  capacity: {
    type: Number,
    default: 0
  }
});

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  tags: [{
    type: String,
    index: true
  }],
  venue: {
    name: String,
    address: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    }
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    index: true
  },
  endDate: {
    type: Date,
    required: true
  },
  eventTimes: [eventTimeSchema],
  price: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient querying
eventSchema.index({ category: 1, startDate: 1 });

// Text index for full-text search
eventSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;