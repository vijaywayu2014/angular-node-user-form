const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/User');
let Email    = require('../email');

// Add Employee
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log('email sending');
      Email.sendEmail(req.body.email);
      res.json(data)
    }
  })
});

// Get All User
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = userRoute;