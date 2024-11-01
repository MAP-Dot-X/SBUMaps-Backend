const reportRouter = require('express').Router();
const Report = require('../models/report');

// Create a new report with the updated schema and store it in the database
reportRouter.post('/new', async (req, res) => {
    const { body } = req;

    const report = new Report({
        title: body.title,
        description: body.description,
        status: body.status || 'Open',
        priority: body.priority || 'Medium',
        category: body.category,
        reportedBy: body.reportedBy,
        assignedTo: body.assignedTo,
        relatedEvent: body.relatedEvent,
        attachments: body.attachments,
        comments: body.comments,
        tags: body.tags,
        createdAt: body.createdAt || Date.now(),
        updatedAt: body.updatedAt || Date.now(),
        resolvedAt: body.resolvedAt
    });

    try {
        const savedReport = await report.save();
        res.json(savedReport);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all reports from the database
reportRouter.get('/', async (req, res) => {
  const reports = await Report.find({});
  res.json(reports);
});

// Get a single report by its ID
reportRouter.get('/:id', async (req, res) => {
  const report = await Report.findById(req.params.id);
  res.json(report);
});

// Update a report by its ID
reportRouter.put('/:id', async (req, res) => {
    const { body } = req;
    
    const report = {
        title: body.title,
        description: body.description,
        status: body.status || 'Open',
        priority: body.priority || 'Medium',
        category: body.category,
        reportedBy: body.reportedBy,
        assignedTo: body.assignedTo,
        relatedEvent: body.relatedEvent,
        attachments: body.attachments,
        comments: body.comments,
        tags: body.tags,
        createdAt: body.createdAt || Date.now(),
        updatedAt: body.updatedAt || Date.now(),
        resolvedAt: body.resolvedAt
    };
    
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, report, { new: true });
    res.json(updatedReport);
});

module.exports = reportRouter;