require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models/index');

const jwtController = {};

jwtController.createToken = (req, res, next) => {
  const { email, accountType } = res.locals.user;
  const user = { email, accountType };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // Here, we're 'serializing' user with a secret key off of our environment variables.
  res.cookie('jwt', accessToken, { HttpOnly: true, Secure: true }); // User information is saved inside of this access token.
  next();
}

jwtController.authenticateToken = (req, res, next) => {
  
  // const authHeader = req.headers['authorization'];
  const token = req.cookies.jwt;
  if (token == null) return res.sendStatus(401); // You do not have a token.

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // You have a token, but it's no longer valid.
    req.user = user; // You have a valid token, so pass user details to req.user for further use.
    next();
  });
}

module.exports = jwtController;