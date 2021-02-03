const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // unique email
  if (err.code === 11000) {
    errors.email = 'This email is already exists';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signupGet = (req, res) => {
  res.render('signup');
};

const signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).send({ errors });
  }
};

const loginGet = (req, res) => {
  res.render('login');
};

const loginPost = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('user login');
};

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
};
