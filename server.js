require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const uploadRoutes = require('./routes/upload');
const statusRoutes = require('./routes/status');
const { processQueue } = require('./services/queue');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/upload', uploadRoutes);
app.use('/status', statusRoutes);

// Start queue processing
processQueue();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});