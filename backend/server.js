const express = require('express');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

// Middlewares
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 8000;
// Listen
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
