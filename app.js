const express = require('express');
const app = express();

const userRoute = require('./routes/users');
const profileRoute = require('./routes/profile');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

// Init middleware
app.use(express.json({ extended: false }));

// App routes setting
app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);

module.exports = app;
