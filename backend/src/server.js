const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { connectDatabase } = require('./config/database');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  const port = Number(process.env.PORT) || 5000;

  await connectDatabase();

  const server = app.listen(port, () => {
    console.log(`[Server] LifeXP Backend running on http://localhost:${port}`);
    console.log(`[Server] Health check: http://localhost:${port}/api/health`);
  });

  return server;
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('[Server] Failed to start server:', error.message);
    process.exit(1);
  });
}

module.exports = {
  app,
  startServer,
};
