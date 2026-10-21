const mongoose = require('mongoose');
const seedData = require('./seed');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/swachh_alandi');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedData();
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    // Do not exit, allow server to run so user can see it's active
  }
};

module.exports = connectDB;
