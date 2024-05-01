const express = require('express');
const codiceController = require('./../controllers/codiceController');
const authController = require('./../controllers/authController');
const upload = require('./../utils/multerUpload');

const router = express.Router();

router.get('/categories', codiceController.getCategories);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    upload.fields([{ name: 'images' }, { name: 'cover' }]),
    codiceController.resizeImages,
    codiceController.replaceImgSrc,
    codiceController.createCodice
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    codiceController.getAllCodices
  );

router.route('/:id').get(codiceController.getCodice);

module.exports = router;
