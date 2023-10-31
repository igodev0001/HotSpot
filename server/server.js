require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const auth = require('./routes/api/auth');
const popular = require('./routes/api/popular');
const cors = require('cors');

const app = express();
// Connect Database
connectDB();
app.use(cors());
// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', auth);
app.use('/api/popular', popular);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));