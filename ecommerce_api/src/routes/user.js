const express = require('express');
const router = express.Router();
const {  loginUser, register } = require('../controllers/user');
const {
  validateUserRegistration,
  validateUserLogin,
} = require('../utils/middleware/validation');
const routes = require('../utils/routes/routes.util');

// Register User
router.post(routes.userRegister, validateUserRegistration,register);

// Login User
router.post(routes.userLogin, validateUserLogin, loginUser);

module.exports = router;