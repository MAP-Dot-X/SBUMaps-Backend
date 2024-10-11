const eventRouter = require('express').Router();
const Event = require('../models/event');

// Create a new event with the updated schema and store it in the database
eventRouter.post('/new', async (req, res) => {
    const { body } = req;

    const event = new Event({
        name: body.name,
        description: body.description,
        category: body.category,
        tags: body.tags,
        venue: body.venue,
        organizer: body.organizer,
        startDate: body.startDate,
        endDate: body.endDate,
        eventTimes: body.eventTimes,
        price: body.price,
        imageUrl: body.imageUrl,
    });

    try {
        const savedEvent = await event.save();
        res.json(savedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all events from the database
eventRouter.get('/', async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// Get a single event by its ID
eventRouter.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

// Update an event by its ID
eventRouter.put('/:id', async (req, res) => {
    const { body } = req;
    
    const event = {
        name: body.name,
        description: body.description,
        category: body.category,
        tags: body.tags,
        venue: body.venue,
        organizer: body.organizer,
        startDate: body.startDate,
        endDate: body.endDate,
        eventTimes: body.eventTimes,
        price: body.price,
        imageUrl: body.imageUrl,
    };
    
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, event, { new: true });
    res.json(updatedEvent);
});

// Delete an event by its ID
eventRouter.delete('/:id', async (req, res) => {
  await Event.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = eventRouter;