const express = require('express');
const workController = require('./../controllers/workControllers');

const router = express.Router();

router.param('id', workController.handleIdParam);

router.route('/').get(workController.getWorks).post(workController.createWork);

router
  .route('/:id')
  .get(workController.getWork)
  .patch(workController.patchWork)
  .delete(workController.deleteWork);

module.exports = router;
