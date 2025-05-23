const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ProjectRequest = require('./../models/projectRequestModel');
const ApiFeatures = require('./../utils/apiFeatures');
const SendMail = require('./../utils/email');

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

  //We can transfor Mongo Docs. in plain Objects. That way, we can delete its properties.
  const projectObj = newProjectRequest.toObject();

  delete projectObj.isAnswered;
  delete projectObj.createdAt;
  delete projectObj.__v;

  //Send Confirmation Email
  await new SendMail(projectObj).sendProjectRequestConfirmation();

  res.status(201).json({
    status: 'sucess',
    data: {
      projectRequest: projectObj,
    },
  });
});

exports.answerProjectRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const projectRequest = await ProjectRequest.findById(id);

  await new SendMail(
    projectRequest,
    req.body.subject,
    req.body.content
  ).sendAnswer(req.body.subject);

  projectRequest.answers.push({
    content: req.body.content,
    subject: req.body.subject,
  });
  if (!projectRequest.isAnswered) projectRequest.isAnswered = true;

  const newProjectRequest = await projectRequest.save();

  res.status(200).json({
    status: 'success',
    data: {
      projectRequest: newProjectRequest,
    },
  });
});

exports.updateProjectRequest = catchAsync(async (req, res, next) => {
  const patch = { ...req.body };

  if (req.body.isArchived) patch.currentProject = false;

  const updatedProjectRequest = await ProjectRequest.findByIdAndUpdate(
    req.params.id,
    patch,
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

exports.toggleCurrentProjects = catchAsync(async (req, res, next) => {
  if (!req.body.currentProject) return next();

  const requests = await ProjectRequest.find();

  requests.forEach(async (project) => {
    await project.updateOne({
      currentProject: false,
    });
  });

  next();
});

exports.deleteProjectRequest = catchAsync(async (req, res, next) => {
  await ProjectRequest.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.deleteAllProjectsRequests = catchAsync(async (req, res, next) => {
  const projects = await ProjectRequest.find({});

  projects.forEach(async (project) => {
    await ProjectRequest.findByIdAndDelete(project._id);
  });

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
