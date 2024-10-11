const userRouter = require('express').Router();
const User = require('../models/user');

// Create a new user with the updated schema and store it in the database
userRouter.post('/new', async (req, res) => {
    const { body } = req;

    const user = new User({
        username: body.username,
        email: body.email,
        password: body.password,
        role: body.role,
        organization: body.organization,
        createdAt: body.createdAt || Date.now(),
        updatedAt: body.updatedAt || Date.now()
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Get user by ID
userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update user by ID
userRouter.put('/:id', async (req, res) => {
    const { body } = req;

    const updatedUser = {
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        profilePicture: body.profilePicture,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
        contactInformation: body.contactInformation,
        neighborhood: body.neighborhood,
        friends: body.friends,
        organizations: body.organizations,
        interests: body.interests,
        skills: body.skills,
        socialMediaProfiles: body.socialMediaProfiles,
        preferredLanguage: body.preferredLanguage,
        timezone: body.timezone,
        isActive: body.isActive,
        lastLogin: body.lastLogin,
        updatedAt: Date.now()
    };

    try {
        const user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user by ID
userRouter.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = userRouter;