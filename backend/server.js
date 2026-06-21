const express = require('express');

const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Load env vars
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/init');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Make io accessible to our router
app.set('io', io);

// Mount routers
app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/clients', require('./routes/clients.routes'));
// app.use('/api/orders', require('./routes/orders.routes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port ${PORT}`));
