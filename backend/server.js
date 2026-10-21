const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/ping', (req, res) => res.send('pong'));

// Route files
const auth = require('./routes/auth');
const complaints = require('./routes/complaints');
const events = require('./routes/events');
const litter = require('./routes/litter');
const pickup = require('./routes/pickup');
const ai = require('./routes/ai');
const engagement = require('./routes/engagement');
const workers = require('./routes/workers');


// Mount routers
app.use('/api/auth', auth);
app.use('/api/complaints', complaints);
app.use('/api/events', events);
app.use('/api/litter', litter);
app.use('/api/pickup', pickup);
app.use('/api/ai', ai);
app.use('/api/engagement', engagement);
app.use('/api/workers', workers);


// Fallback to index.html for unknown routes (for SPA behavior, though we are using multi-page, this is fine)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('==================================================');
  console.log(`🚀 SERVER ACTIVE ON PORT ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`🔗 IP:  http://127.0.0.1:${PORT}`);
  console.log('==================================================');
});

// Also bind to backup port 3000 for maximum reliability
try {
  const http = require('http');
  const server3000 = http.createServer(app);
  server3000.listen(3000, '0.0.0.0', () => {
    console.log(`🔗 Backup URL: http://localhost:3000`);
  });
} catch (e) {
  // Ignore if port 3000 unavailable
}
