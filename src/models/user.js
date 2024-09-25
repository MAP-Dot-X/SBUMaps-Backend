const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  profilePicture: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say']
  },
  contactInformation: {
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  neighborhood: {
    type: String,
    trim: true,
    index: true
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  organizations: [{
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    },
    role: String
  }],
  interests: [{
    type: String,
    index: true
  }],
  skills: [{
    type: String,
    index: true
  }],
  socialMediaProfiles: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },
  preferredLanguage: String,
  timezone: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient name-based searches
userSchema.index({ firstName: 1, lastName: 1 });

// Text index for full-text search
userSchema.index({ username: 'text', firstName: 'text', lastName: 'text', 'contactInformation.address.city': 'text', neighborhood: 'text', interests: 'text', skills: 'text' });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to update the 'updatedAt' field
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;