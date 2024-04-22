const express = require('express');
const workController = require('./../controllers/workControllers');
const authController = require('./../controllers/authController');

const router = express.Router();

router.param('id', workController.handleIdParam);

router
  .route('/route-alias-example')
  .get(workController.aliasRouteExample, workController.getAllWorks);

router
  .route('/')
  .get(workController.getAllWorks)
  .post(workController.createWork);

router
  .route('/:id')
  .get(workController.getWork)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    workController.patchWork
  )
  .delete(workController.deleteWork);

module.exports = router;
