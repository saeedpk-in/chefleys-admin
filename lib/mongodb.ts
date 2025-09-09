import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudkitchen';

let isConnected = false;

export const connectToDatabase = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    // Connect to the MongoDB database (without the old options)
    await mongoose.connect(MONGODB_URI);

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw new Error('MongoDB connection failed');
  }
};
