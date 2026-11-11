const mongoose = require('mongoose');

const READY_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

const connectDatabase = async (uri) => {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lifexp';

  try {
    const conn = await mongoose.connect(mongoUri);
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[Database] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    }
    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB connection error: ${error.message}`);
    throw error;
  }
};

const getDatabaseStatus = () => {
  const state = mongoose.connection.readyState;
  return {
    state: READY_STATES[state] || 'unknown',
    isConnected: state === 1,
    name: mongoose.connection.name || null,
    host: mongoose.connection.host || null,
  };
};

const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
};

module.exports = {
  connectDatabase,
  getDatabaseStatus,
  disconnectDatabase,
};
