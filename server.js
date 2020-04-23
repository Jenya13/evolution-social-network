const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtExceptions', (err) => {
  console.log('Uncaught exceptions!!!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// Data Base connection
const db = process.env.DATABASE_LOCAL;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('mongoDB connected...'));

const PORT = process.env.PORT || 5000;

// listens for connection on the given port
const server = app.listen(PORT, () => {
  console.log(`Server started on port - ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection!!!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
