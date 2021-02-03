const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please, enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please, enter a valid email'],
  },

  password: {
    type: String,
    required: [true, 'Please, enter password'],
    minlength: [7, 'Minimum password length is 7 characters'],
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
