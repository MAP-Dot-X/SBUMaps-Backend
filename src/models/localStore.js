const mongoose = require('mongoose');

//Stored name and location, can update later if we want more info to be stored

const localStoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return (
            v.length === 2 &&
            v[0] >= -180 && v[0] <= 180 &&
            v[1] >= -90 && v[1] <= 90
          );
        },
        message: props => `${props.value} is not a valid coordinate pair!`,
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

localStoreSchema.index({ location: '2dsphere' });

const LocalStore = mongoose.model('LocalStore', localStoreSchema);

module.exports = LocalStore;
