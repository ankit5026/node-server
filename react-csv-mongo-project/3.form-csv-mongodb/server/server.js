const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
//king

// Paste CORS configuration RIGHT HERE (after app creation, before routes)
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  optionsSuccessStatus: 200
};
app.use(cors()); // <-- This replaces the basic app.use(cors())


//HIIIII

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Add these connection event listeners right here ▼
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});
// ▲ Keep them right after connect() but before schemas
  

// User Data Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
});

const User = mongoose.model('User', userSchema);

// API Routes
// (1) Add new user
app.post('/api/users', async (req, res) => {
  try {
    console.log('Received data:', req.body); // Add this line
    const newUser = new User(req.body);
    await newUser.save();
    console.log('Saved to MongoDB:', newUser); // Add this line
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error saving user:', err); // Add this line
    res.status(400).json({ error: err.message });
  }
});

// (2) Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (3) Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// (4) Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));