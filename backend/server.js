const express = require('express');
const vhost = require('vhost');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const regular = express();
const employer = express();

const app = express();

// connect database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// Routes for Regular
app.use('/api/auth', require('./routes/api/regular/auth'));
app.use('/api/users', require('./routes/api/regular/users'));
app.use('/api/posts', require('./routes/api/regular/posts'));
app.use('/api/profile', require('./routes/api/regular/profile'));
app.use('/api/companies', require('./routes/api/regular/companies'));
app.use('/api/jobs', require('./routes/api/regular/jobs'));

// Routes for Employers
// employer.get('/api', (req, res) => {
//   res.send('Hello, World!');
// })

// app.use(vhost('localhost', regular));
// app.use(vhost('employers.localhost', employer));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
// Listen
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
