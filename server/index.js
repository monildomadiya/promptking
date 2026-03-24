const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: function (origin, callback) {
    // Allows any origin to connect (useful since frontend URL is unknown)
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.set('trust proxy', 1); // Trust Render proxy for secure cookies

const isProd = process.env.RENDER === 'true' || process.env.NODE_ENV === 'production';

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: !!isProd, 
    sameSite: isProd ? 'none' : 'lax'
  }
}));

// Basic route
app.get('/', (req, res) => {
  res.send('PromptKing API is running...');
});

// Import and use routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Serve uploads static folder
app.use('/uploads', express.static('uploads'));

// Global error handler (must be after routes)
app.use((err, req, res, next) => {
  console.error('GLOBAL SERVER ERROR:', err);
  // Ensure CORS headers are present even on errors
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(500).json({ 
    error: "Internal Server Error", 
    message: err.message,
    details: process.env.NODE_ENV === 'production' ? undefined : err.stack 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
