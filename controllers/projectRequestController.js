const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ProjectRequest = require('./../models/projectRequestModel');
const ApiFeatures = require('./../utils/apiFeatures');

exports.getAllProjectsRequests = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(ProjectRequest.find({}), req.query);

  features.filter().sort().selectFields().paginate();

  const projectRequests = await features.mongoQuery;

  res.status(200).json({
    status: 'sucess',
    results: projectRequests.length,
    data: {
      projectRequests,
    },
  });
});

exports.getProjectRequest = catchAsync(async (req, res, next) => {
  const projectRequest = await ProjectRequest.findById(req.params.id);

  if (!projectRequest)
    next(new AppError('Could not find this Project Request', 404));

  res.status(200).json({
    status: 'sucess',
    data: {
      projectRequest,
    },
  });
});

exports.createProjectRequest = catchAsync(async (req, res, next) => {
  const { name, email, position, company, description, budget } = req.body;

  const newProjectRequest = await ProjectRequest.create({
    name,
    email,
    position,
    company,
    description,
    budget,
  });

  res.status(201).json({
    status: 'sucess',
    data: {
      projectRequest: newProjectRequest,
    },
  });
});

exports.updateProjectRequest = catchAsync(async (req, res, next) => {
  const updatedProjectRequest = await ProjectRequest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProjectRequest)
    next(new AppError('Could not find this Project Request', 404));

  res.status(200).json({
    status: 'sucess',
    data: {
      projectRequest: updatedProjectRequest,
    },
  });
});

exports.deleteProjectRequest = catchAsync(async (req, res, next) => {
  await ProjectRequest.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
