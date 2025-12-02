// server.js — CLEAN & RENDER PRODUCTION VERSION

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./lib/mongodb');

const app = express();
const PORT = process.env.PORT || 3001;


// -----------------------
// Security Middleware
// -----------------------
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
  })
);


// -----------------------
// CORS CONFIG
// -----------------------
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowed = [
      process.env.APP_URL,
      'https://white-shop-1.onrender.com'
    ];

    if (allowed.includes(origin)) {
      return callback(null, true);
    }

    console.warn('❌ CORS blocked:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));


// -----------------------
// Body Parsers
// -----------------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// -----------------------
// Rate Limiting
// -----------------------
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'production' ? 200 : 2000,
  })
);


// -----------------------
// Health Check
// -----------------------
app.get('/health', async (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString(),
  });
});


// -----------------------
// BASE ROUTE
// -----------------------
app.get('/', (req, res) => {
  res.send('API is running!');
});


// -----------------------
// ROUTES
// -----------------------
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/cart', require('./routes/cart'));
app.use('/api/v1/orders', require('./routes/orders'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/admin', require('./routes/admin'));


// -----------------------
// ERROR HANDLER
// -----------------------
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({
    status: 500,
    message: err.message,
  });
});


// -----------------------
// START SERVER
// -----------------------
const startServer = async () => {
  try {
    // CONNECT TO MONGODB
    await connectDB(); // Important: we do not check return value

    console.log("✅ MongoDB connection initialized");

    app.listen(PORT, () =>
      console.log(`🚀 API server running on port ${PORT} via Render`)
    );

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
