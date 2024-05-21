const express = require('express');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/verify-user', authController.protect, authController.verify);

router.route('/').patch(authController.protect, userController.patchUser);

router.get(
  '/verify',
  authController.protect,
  authController.restrictTo('admin'),
  authController.verify
);

module.exports = router;
