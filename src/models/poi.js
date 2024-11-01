const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      // validate: {
      //   validator: function(v) {
      //     return v.length === 2 && 
      //            v[0] >= -180 && v[0] <= 180 && 
      //            v[1] >= -90 && v[1] <= 90;
      //   },
      //   message: props => `${props.value} is not a valid coordinate pair!`
      // }
    }
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
  createdBy: {
    //type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'User',
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a 2dsphere index on the location field
poiSchema.index({ location: '2dsphere' });

// Compound index for efficient querying by category and creation date
poiSchema.index({ category: 1, createdAt: -1 });

// Text index for full-text search on name and description
poiSchema.index({ name: 'text', description: 'text' });

const Poi = mongoose.model('poi', poiSchema);

module.exports = Poi;