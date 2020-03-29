const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRoute = require('./routes/users');
const profileRoute = require('./routes/profile');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Init middleware
app.use(express.json({ extended: false }));

// App routes setting
app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
