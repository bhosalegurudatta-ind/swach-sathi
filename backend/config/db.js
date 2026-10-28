const mongoose = require('mongoose');
const seedData = require('./seed');

const ATLAS_FALLBACK_URI = 'mongodb+srv://bhosalegurudatta_db_user:mqkpb0jZZlfgBOgk@cluster0.lrpro00.mongodb.net/swachh_alandi?retryWrites=true&w=majority';

const connectDB = async () => {
  // Never buffer queries if disconnected so requests fail-fast to mock data instead of hanging
  mongoose.set('bufferCommands', false);

  const uri = process.env.MONGO_URI || (process.env.NODE_ENV === 'production' ? ATLAS_FALLBACK_URI : 'mongodb://localhost:27017/swachh_alandi');

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    await seedData();
  } catch (error) {
    console.error(`⚠️ Primary MongoDB Connection Failed: ${error.message}`);
    if (uri !== ATLAS_FALLBACK_URI) {
      try {
        console.log('🔄 Trying Atlas Fallback Connection...');
        const conn2 = await mongoose.connect(ATLAS_FALLBACK_URI, {
          serverSelectionTimeoutMS: 5000
        });
        console.log(`✅ MongoDB Atlas Connected: ${conn2.connection.host}`);
        await seedData();
      } catch (err2) {
        console.error(`⚠️ MongoDB Atlas fallback also failed: ${err2.message}`);
      }
    }
  }
};

module.exports = connectDB;
