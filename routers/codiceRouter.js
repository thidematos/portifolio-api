const express = require('express');
const codiceController = require('./../controllers/codiceController');
const authController = require('./../controllers/authController');
const upload = require('./../utils/multerUpload');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    upload.array('images'),
    codiceController.resizeImages,
    codiceController.replaceImgSrc,
    codiceController.createCodice
  );

router.route('/:id').get(codiceController.getCodice);

module.exports = router;
