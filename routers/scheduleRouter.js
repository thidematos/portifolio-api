const express = require('express');
const scheduleController = require('./../controllers/scheduleController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').post(scheduleController.createSchedule);

module.exports = router;
