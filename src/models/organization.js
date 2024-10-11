const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
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
    location: {
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
    contact: {
        email: String,
        phone: String
    },
    imageUrl: String
});

organizationSchema.index({ location: '2dsphere' });
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;