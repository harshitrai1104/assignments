/* eslint-disable arrow-body-style */
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { findByIdAndDelete } = require('../models/userModel');

const signtoken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signtoken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if emai and password exist
  if (!email || !password) {
    next(new AppError('Please provide email an password', 400));
  }
  // checking if the user and password is correct
  const user = await User.findOne({ email }).select('+password');

  // checking if the user exist and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // sending the token is password is correct and user exits
  const token = signtoken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // getting the token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('you are not logged in. please login to get asscess', 401)
    );
  }
  // verificattion of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exists

  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(new AppError('The User with this token does not exist', 404));

  // check if user changed the password after jwt was issued

  freshUser.changedPasswordAfter(decoded.iat);
  next();
});
