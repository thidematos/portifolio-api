const AppError = require('../utils/appError');
const Work = require('./../models/workModel');
const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllWorks = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Work.find({}), req.query);

  const query = features.filter().sort().selectFields().paginate().mongoQuery;

  const works = await query;

  res.status(200).json({
    status: 'sucess',
    results: works.length,
    data: {
      works,
    },
  });
});

exports.getWork = catchAsync(async (req, res, next) => {
  const work = await Work.findById(req.params.id);

  if (!work) return next(new AppError('Could not find this work', 404));

  res.status(200).json({
    status: 'sucess',
    data: { work },
  });
});

exports.createWork = catchAsync(async (req, res, next) => {
  const {
    src,
    title,
    description,
    mainImg,
    subTitle,
    sections,
    finalDetails,
    colors,
    link,
  } = req.body;

  const viewOrder = await Work.countDocuments();

  const newWork = await Work.create({
    src,
    title,
    description,
    mainImg,
    subTitle,
    sections,
    finalDetails,
    colors,
    link,
    viewOrder: viewOrder + 1,
  });

  res.status(201).json({
    status: 'sucess',
    data: newWork,
  });
});

exports.patchWork = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const updatedWork = await Work.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedWork) return new AppError('Could not find this work', 404);

  res.status(200).json({
    status: 'sucess',
    data: {
      works: updatedWork,
    },
  });
});

exports.deleteWork = catchAsync(async (req, res, next) => {
  await Work.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.aliasRouteExample = (req, res, next) => {
  req.query.title = 'O Coliseu';
  req.query.fields = 'title,description';
  //Populate the queries for the Client! So he does not need to do that.
  next();
};

exports.handleIdParam = (req, res, next, param) => {
  console.log(`Hello from the Router Param Middleware! Param: ${param}`);
  next();
};
