const express = require('express');
const workController = require('./../controllers/workControllers');
const authController = require('./../controllers/authController');
const AppError = require('../utils/appError');

const multer = require('multer');
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/'))
    cb(new AppError('Não foi detectado um arquivo de imagem.', 400), 400);
  cb(null, true);
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const router = express.Router();

router
  .route('/route-alias-example')
  .get(workController.aliasRouteExample, workController.getAllWorks);

router
  .route('/')
  .get(workController.getAllWorks)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    upload.fields([
      { name: 'src', maxCount: 1 },
      { name: 'mainImg', maxCount: 1 },
      { name: 'projectLogo', maxCount: 1 },
      { name: 'sectionImg' },
    ]),
    workController.resizeMultipleImages,
    workController.createWork
  );

router.patch(
  '/add-section/:id',
  authController.protect,
  authController.restrictTo('admin'),
  upload.single('image'),
  workController.resizeImage,
  workController.patchAddSection
);

router
  .route('/:id')
  .get(workController.getWork)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    upload.single('image'),
    workController.resizeImage,
    workController.patchWork
  )
  .delete(workController.deleteWork);

router
  .route('/:id/:sectionId')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    upload.single('image'),
    workController.resizeImage,
    workController.patchSection
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    workController.deleteSection
  );

module.exports = router;
