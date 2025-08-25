const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const clothRoutes = require('./routes/cloths');

app.use('/auth', authRoutes);
app.use('/cloth', clothRoutes); // now POST /cloth works

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
