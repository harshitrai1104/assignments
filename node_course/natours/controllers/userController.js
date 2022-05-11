const fs = require('fs');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// Route Handlers
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.deleteUser = catchAsync(async (req, res) => {
  const data = await User.deleteMany();
  res.status(200).json({
    status: 'Success',
    data,
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
