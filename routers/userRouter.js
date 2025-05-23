const express = require('express');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');
const upload = require('./../utils/multerUpload');

const router = express.Router();

router.post(
  '/signup',
  upload.single('photo'),
  authController.resizePhoto,
  authController.signup
);

router.post('/forgot-password', authController.forgotPassword);

router.patch('/reset-password/:resetToken', authController.resetPassword);

router.post('/login', authController.login);

router.get('/verify-user', authController.protect, authController.verify);

router.route('/').patch(authController.protect, userController.patchUser);

router.get(
  '/read-laters',
  authController.protect,
  userController.getUserReadLaters
);

router.get(
  '/verify',
  authController.protect,
  authController.restrictTo('admin'),
  authController.verify
);

module.exports = router;
