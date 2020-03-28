const mongoose = require('mongoose');

//  Connection to mongoDB
const connectDB = async db => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('mongoDB connected...');
  } catch (e) {
    console.error(e.message);

    //  Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
