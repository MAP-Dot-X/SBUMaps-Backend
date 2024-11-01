const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('express-oauth2-jwt-bearer');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

// Auth0 configuration
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected route
app.get('/api/private', checkJwt, (req, res) => {
  res.json({ message: 'This is a private endpoint' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Routers
const eventsRouter = require('./controllers/event');
const organizationsRouter = require('./controllers/organization');
const poiRouter = require('./controllers/poi');
//const reportRouter = require('./controllers/report');
const userRouter = require('./controllers/user');
app.use('/api/events', eventsRouter);
app.use('/api/organizations', organizationsRouter);
app.use('/api/poi', poiRouter);
//app.use('/api/report', reportRouter);
app.use('/api/user', userRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;