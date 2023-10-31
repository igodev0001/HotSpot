const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for auth check
const bycrypt = require("bcryptjs");
const { errorHandler } = require('../helpers/dbErrorHandler');

require('dotenv').config();

exports.signup = async (req, res) => {

  let { email, password: planPassword, name} = req.body;
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ status: "error", error: "Duplicate email" });
  }
  const password = await bycrypt.hash(planPassword, 10);

  try {
    const resUser = await User.create({ name, email, password });
    res.status(201).json({ status: "success", user:resUser, message: "User created" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(500).json({ status: "error", message: "User already in use" });
    }
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

exports.signin = async(req, res) => {
  
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).lean();
    if (!existingUser) {
      return res.status(401).json({ error: "User doesn't exists!" });
    }
    if (!password) {
      return res.status(400).json({ status: "error", error: "Password is required!" });
    }
    const isMatch = await bycrypt.compare(password, existingUser.password);
    
    if (isMatch) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      
      res.cookie('t', token, { expire: new Date() + 9999 });
      const { _id, name, email, role } = existingUser;
      return res.status(200).json({token, user: { _id, email, name, role } });
    } else {
      return res.status(400).json({ status: "error", error: "Password is incorrect!" });
    }
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256'],
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    });
  }
  next();
};
