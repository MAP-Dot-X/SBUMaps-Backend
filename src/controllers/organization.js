const organizationRouter = require('express').Router();
const Organization = require('../models/organization');

// Create a new organization with the updated schema and store it in the database
organizationRouter.post('/new', async (req, res) => {
    const { body } = req;

    const organization = new Organization({
        name: body.name,
        description: body.description,
        category: body.category,
        tags: body.tags,
        location: body.location,
        contact: body.contact,
        imageUrl: body.imageUrl,
    });

    try {
        const savedOrganization = await organization.save();
        res.json(savedOrganization);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});