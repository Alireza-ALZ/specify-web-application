const mongoose = require('mongoose');

async function connectDB(uri) {
  const mongoUri =
    uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/specify_app';
  await mongoose.connect(mongoUri, { autoIndex: true });
  console.log('Connected to MongoDB');
}

module.exports = { connectDB, mongoose };
