const express = require('express');
const codiceController = require('./../controllers/codiceController');
const authController = require('./../controllers/authController');
const upload = require('./../utils/multerUpload');

const router = express.Router();

router.get('/categories', codiceController.getCategories);

router
  .route('/top-gophed')
  .post(codiceController.getTopGophed, codiceController.getAllCodices);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    upload.fields([{ name: 'images' }, { name: 'cover' }]),
    codiceController.resizeImages,
    codiceController.replaceImgSrc,
    codiceController.createCodice,
    codiceController.sendNewCodiceNotification
  )
  .get(codiceController.getAllCodices);

router
  .route('/:id')
  .get(codiceController.getCodice)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    upload.fields([{ name: 'cover' }, { name: 'images' }]),
    codiceController.resizeImages,
    codiceController.replaceImgSrc,
    codiceController.verifyImgContent,
    codiceController.patchCodice
  );

router.post('/test', codiceController.sendNewCodiceNotification);
module.exports = router;
