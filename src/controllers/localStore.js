const localStoreRouter = require('express').Router();
const LocalStore = require('../models/localStore');

// Create a new local store and save it to the database
localStoreRouter.post('/new', async (req, res) => {
    const { body } = req;

    const localStore = new LocalStore({
        name: body.name,
        location: {
            type: 'Point',
            coordinates: [body.longitude, body.latitude],
        }
    });

    try {
        const savedLocalStore = await localStore.save();
        res.json(savedLocalStore);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all local stores from the database
localStoreRouter.get('/', async (req, res) => {
    try {
        const localStores = await LocalStore.find({});
        res.json(localStores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single local store by its ID
localStoreRouter.get('/:id', async (req, res) => {
    try {
        const localStore = await LocalStore.findById(req.params.id);
        if (!localStore) {
            return res.status(404).json({ error: 'Local store not found' });
        }
        res.json(localStore);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a local store by its ID
localStoreRouter.put('/:id', async (req, res) => {
    const { body } = req;

    const updatedLocalStore = {
        name: body.name,
        location: {
            type: 'Point',
            coordinates: [body.longitude, body.latitude],
        }
    };

    try {
        const localStore = await LocalStore.findByIdAndUpdate(req.params.id, updatedLocalStore, { new: true });
        if (!localStore) {
            return res.status(404).json({ error: 'Local store not found' });
        }
        res.json(localStore);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a local store by its ID
localStoreRouter.delete('/:id', async (req, res) => {
    try {
        const localStore = await LocalStore.findByIdAndDelete(req.params.id);
        if (!localStore) {
            return res.status(404).json({ error: 'Local store not found' });
        }
        res.json({ message: 'Local store deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = localStoreRouter;
