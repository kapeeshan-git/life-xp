const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401);
      return next(
        new Error('Authentication required. Please provide a valid Bearer token.')
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401);
      return next(new Error('Account associated with this token no longer exists.'));
    }

    req.user = user;
    return next();
  } catch (error) {
    res.status(401);
    return next(
      new Error(
        error.name === 'TokenExpiredError'
          ? 'Session expired. Please log in again.'
          : 'Not authorized, invalid token.'
      )
    );
  }
};

module.exports = {
  protect,
};
