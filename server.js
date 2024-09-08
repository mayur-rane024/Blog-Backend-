const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config(); // For loading environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API Routes
app.use('/api/blogs', blogRoutes);

// Handle React routing, return the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
