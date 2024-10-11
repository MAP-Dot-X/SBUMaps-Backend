const poiRouter = require('express').Router();
const Poi = require('../models/poi');

// Create a new point of interest with the updated schema and store it in the database
poiRouter.post('/new', async (req, res) => {
    const { body } = req;

    const poi = new Poi({
        name: body.name,
        description: body.description,
        location: {
            type: 'Point',
            coordinates: [body.longitude, body.latitude],
        },
        category: body.category,
        tags: body.tags,
        createdBy: body.createdBy,
    });

    try {
        const savedPoi = await poi.save();
        res.json(savedPoi);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all points of interest from the database
poiRouter.get('/', async (req, res) => {
  const pois = await Poi.find({});
  res.json(pois);
});

// Get a single point of interest by its ID
poiRouter.get('/:id', async (req, res) => {
  const poi = await Poi.findById(req.params.id);
  res.json(poi);
});

// Update a point of interest by its ID
poiRouter.put('/:id', async (req, res) => {
    const { body } = req;
    
    const poi = {
        name: body.name,
        description: body.description,
        location: {
            type: 'Point',
            coordinates: [body.longitude, body.latitude],
        },
        category: body.category,
        tags: body.tags,
        createdBy: body.createdBy,
    };
    
    const updatedPoi = await Poi.findByIdAndUpdate(req.params.id, poi, { new: true });
    res.json(updatedPoi);
});

module.exports = poiRouter;