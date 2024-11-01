const poiRouter = require('express').Router();
const { find } = require('../models/event');
const Poi = require('../models/poi');

// Create a new point of interest with the updated schema and store it in the database
poiRouter.post('/new', async (req, res) => {
    const { body } = req;

    function normalizeCoordinates(lat, lon) {
        // Normalize latitude
        lat = Math.max(-90, Math.min(90, lat));
        
        // Normalize longitude
        lon = ((lon + 180) % 360 + 360) % 360 - 180;
        
        return { latitude: lat, longitude: lon };
    }

    const { latitude, longitude } = normalizeCoordinates(body.latitude, body.longitude);

    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);

    const poi = new Poi({
        name: body.name,
        description: body.description,
        location: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)],
        },
        category: body.category,
        tags: body.tags,
        createdBy: body.createdBy,
    });

    try {
        const savedPoi = await poi.save();
        res.json(savedPoi);
        console.log("Saved POI to database");
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log("Failed to save POI to database");
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

    function normalizeCoordinates(lat, lon) {
        // Normalize latitude
        lat = Math.max(-90, Math.min(90, lat));
        
        // Normalize longitude
        lon = ((lon + 180) % 360 + 360) % 360 - 180;
        
        return { latitude: lat, longitude: lon };
    }

    const { latitude, longitude } = normalizeCoordinates(body.latitude, body.longitude);

    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
    
    const poi = {
        name: body.name,
        description: body.description,
        location: {
            type: 'Point',
            coordinates: [latitude, longitude],
        },
        category: body.category,
        tags: body.tags,
        createdBy: body.createdBy,
    };
    
    const updatedPoi = await Poi.findByIdAndUpdate(req.params.id, poi, { new: true });
    res.json(updatedPoi);
});

module.exports = poiRouter;