const express = require('express');
const projectRequestController = require('./../controllers/projectRequestController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    projectRequestController.getAllProjectsRequests
  )
  .post(projectRequestController.createProjectRequest);

router
  .route('/:id')
  .get(projectRequestController.getProjectRequest)
  .patch(projectRequestController.updateProjectRequest)
  .delete(projectRequestController.deleteProjectRequest);

module.exports = router;
