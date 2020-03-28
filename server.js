const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Data Base connection
const db = process.env.DATABASE_LOCAL;
connectDB(db);

const PORT = process.env.PORT || 5000;

// listens for connection on the given port
app.listen(PORT, () => {
  console.log(`Server started on port - ${PORT}`);
});
