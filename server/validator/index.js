const { check, validationResult } = require('express-validator');
exports.userSignupValidator = (req, res, next) => {
  const { email, password, name } = req.body;

  // Validate the email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(422).json({ error: 'Invalid email address' });
  }

  // Validate the password
  if (!password || password.length < 6) {
    return res.status(422).json({ error: 'Password must be at least 6 characters long' });
  }

  // Validate the name
  if (!name || name.length < 3) {
    return res.status(422).json({ error: 'Name must be at least 3 characters long' });
  }
  next();
};
