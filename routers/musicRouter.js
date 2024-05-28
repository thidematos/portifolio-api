const express = require('express');
const authController = require('./../controllers/authController');
const musicController = require('./../controllers/musicController');
const upload = require('./../utils/multerUpload');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    upload.single('cover'),
    musicController.resizeCover,
    musicController.createMusic
  )
  .get(musicController.getAllMusics);

module.exports = router;
