const mongoose = require('mongoose');

const connectDB = async (mongodbURI) => {
  try {
    await mongoose.connect(mongodbURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB.  Exiting...', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
