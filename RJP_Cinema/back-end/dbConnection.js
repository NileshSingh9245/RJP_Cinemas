const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/rjp_cinemas');
    // Connected to Database
  } catch (error) {
    // Handle DB connection error
  }
};

module.exports = connectDB;