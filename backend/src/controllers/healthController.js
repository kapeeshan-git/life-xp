const { getDatabaseStatus } = require('../config/database');

const getHealthStatus = async (req, res, next) => {
  try {
    const dbStatus = getDatabaseStatus();

    res.status(200).json({
      success: true,
      service: 'LifeXP API',
      version: '1.0.0',
      status: 'OK',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHealthStatus,
};
