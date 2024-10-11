const mongoose = require('mongoose');
const Organization = require('./models/organization');
const Event = require('./models/event');
const Poi = require('./models/poi');
const User = require('./models/user');

// Populate the events collection
const events = [
    {
        name: 'Tech Conference 2024',
        description: 'A conference about the latest in technology.',
        category: 'Conference',
        tags: ['tech', 'conference', '2024'],
        venue: {
            name: 'Tech Hall',
            address: '123 Tech Street',
            location: {
                coordinates: [-73.935242, 40.730610]
            }
        },
        organizer: new mongoose.Types.ObjectId(), // Replace with a valid user ID
        startDate: new Date('2024-09-01T09:00:00Z'),
        endDate: new Date('2024-09-01T17:00:00Z'),
        eventTimes: [
            {
                startTime: new Date('2024-09-01T09:00:00Z'),
                endTime: new Date('2024-09-01T12:00:00Z'),
                capacity: 100
            },
            {
                startTime: new Date('2024-09-01T13:00:00Z'),
                endTime: new Date('2024-09-01T17:00:00Z'),
                capacity: 100
            }
        ],
        price: 50,
        imageUrl: 'http://example.com/image.jpg'
    },
    {
        name: 'Music Festival 2024',
        description: 'A festival featuring various artists.',
        category: 'Festival',
        tags: ['music', 'festival', '2024'],
        venue: {
            name: 'Music Park',
            address: '456 Music Avenue',
            location: {
                coordinates: [-73.935242, 40.730610]
            }
        },
        organizer: new mongoose.Types.ObjectId(), // Replace with a valid user ID
        startDate: new Date('2024-10-01T10:00:00Z'),
        endDate: new Date('2024-10-01T22:00:00Z'),
        eventTimes: [
            {
                startTime: new Date('2024-10-01T10:00:00Z'),
                endTime: new Date('2024-10-01T14:00:00Z'),
                capacity: 200
            },
            {
                startTime: new Date('2024-10-01T15:00:00Z'),
                endTime: new Date('2024-10-01T22:00:00Z'),
                capacity: 200
            }
        ],
        price: 100,
        imageUrl: 'http://example.com/image2.jpg'
    }
];

Event.insertMany(events)
    .then(() => console.log('Events populated successfully'))
    .catch(err => console.error('Error populating events:', err));

// Populate the organizations collection
const organizations = [
    {
        name: 'Tech Innovators',
        description: 'An organization dedicated to technological advancements.',
        category: 'Technology',
        tags: ['tech', 'innovation'],
        location: {
            name: 'Tech Hub',
            address: '789 Innovation Drive',
            location: {
                coordinates: [-73.935242, 40.730610]
            }
        },
        contact: {
            email: 'contact@techinnovators.com',
            phone: '123-456-7890'
        },
        imageUrl: 'http://example.com/tech-innovators.jpg'
    },
    {
        name: 'Music Lovers',
        description: 'A community for music enthusiasts.',
        category: 'Music',
        tags: ['music', 'community'],
        location: {
            name: 'Music Center',
            address: '101 Melody Lane',
            location: {
                coordinates: [-73.935242, 40.730610]
            }
        },
        contact: {
            email: 'info@musiclovers.com',
            phone: '987-654-3210'
        },
        imageUrl: 'http://example.com/music-lovers.jpg'
    }
];

Organization.insertMany(organizations)
    .then(() => console.log('Organizations populated successfully'))
    .catch(err => console.error('Error populating organizations:', err));

// Populate the poi collection
const pois = [
    {
        name: 'Central Park',
        description: 'A large public park in New York City.',
        location: {
            type: 'Point',
            coordinates: [-73.965355, 40.782865]
        },
        category: 'Park',
        tags: ['nature', 'recreation'],
        createdBy: new mongoose.Types.ObjectId(), // Replace with a valid user ID
    },
    {
        name: 'Empire State Building',
        description: 'A famous skyscraper in New York City.',
        location: {
            type: 'Point',
            coordinates: [-73.985656, 40.748817]
        },
        category: 'Landmark',
        tags: ['architecture', 'tourism'],
        createdBy: new mongoose.Types.ObjectId(), // Replace with a valid user ID
    }
];

Poi.insertMany(pois)
    .then(() => console.log('POIs populated successfully'))
    .catch(err => console.error('Error populating POIs:', err));

// Populate the users collection
const users = [
    {
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        profilePicture: 'http://example.com/john.jpg',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        contactInformation: {
            phone: '555-1234',
            address: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA'
            }
        },
        neighborhood: 'Manhattan',
        friends: [],
        organizations: [],
        interests: ['tech', 'music'],
        skills: ['programming', 'public speaking'],
        socialMediaProfiles: {
            facebook: 'http://facebook.com/john_doe',
            twitter: 'http://twitter.com/john_doe',
            linkedin: 'http://linkedin.com/in/john_doe',
            instagram: 'http://instagram.com/john_doe'
        },
        preferredLanguage: 'English',
        timezone: 'America/New_York',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: 'jane_smith',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        profilePicture: 'http://example.com/jane.jpg',
        dateOfBirth: new Date('1985-05-15'),
        gender: 'Female',
        contactInformation: {
            phone: '555-5678',
            address: {
                street: '456 Elm St',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90001',
                country: 'USA'
            }
        },
        neighborhood: 'Hollywood',
        friends: [],
        organizations: [],
        interests: ['art', 'travel'],
        skills: ['painting', 'photography'],
        socialMediaProfiles: {
            facebook: 'http://facebook.com/jane_smith',
            twitter: 'http://twitter.com/jane_smith',
            linkedin: 'http://linkedin.com/in/jane_smith',
            instagram: 'http://instagram.com/jane_smith'
        },
        preferredLanguage: 'English',
        timezone: 'America/Los_Angeles',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

User.insertMany(users)
    .then(() => console.log('Users populated successfully'))
    .catch(err => console.error('Error populating users:', err));