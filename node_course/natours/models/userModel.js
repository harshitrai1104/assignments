const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The User must have a Name'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: validator.isEmail,
    // match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please  Fill a Valid email address']
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    minLength: 8,
    required: [true, 'Please Confirm Password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  passwordChangedAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  //run the function if password is modified
  if (!this.isModified('password')) return next();

  //async funtion to hash the password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPassword = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt, JWTTimestamp);
  }

  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
