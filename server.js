import express from 'express';
import routes from './routes/routes.js'; // Adjust path as needed
// const logger = require('./logger');

// // Example log statements
// logger.info('Server is starting...');
// logger.error('This is an error log.');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Call the routes function to set up the routes
routes(app);

// Set port and start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});























