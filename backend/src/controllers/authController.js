const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res, next) => {
  try {
    const username = req.body.username.trim();
    const email = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(409);
      throw new Error('An account with this email already exists.');
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(409);
      throw new Error('This username is already taken.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password.');
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(401);
      throw new Error('Invalid email or password.');
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
