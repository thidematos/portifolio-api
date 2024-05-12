const ProjectRequest = require('../models/projectRequestModel');
const Schedule = require('./../models/scheduleModel');
const catchAsync = require('./../utils/catchAsync');

exports.createSchedule = catchAsync(async (req, res, next) => {
  const { title, description, scheduledAt, requestId } = req.body;

  const schedule = await Schedule.create({
    title,
    description,
    scheduledAt,
    project: requestId,
  });

  const projectRequest = await ProjectRequest.findById(requestId);
  projectRequest.schedules.push(schedule._id);

  const updatedProjectRequest = await projectRequest.save();

  const populatedProjectRequest = await updatedProjectRequest.populate(
    'schedules'
  );

  res.status(201).json({
    status: 'success',
    data: {
      projectRequest: populatedProjectRequest,
    },
  });
});
