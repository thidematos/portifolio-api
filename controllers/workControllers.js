const sharp = require('sharp');
const AppError = require('../utils/appError');
const Work = require('./../models/workModel');
const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const Bucket = require('./../utils/bucket');

const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

exports.getAllWorks = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Work.find({}), req.query);

  const query = features.filter().sort().selectFields().paginate().mongoQuery;

  const works = await query;
  const worksObj = works.map((work) => work.toObject());

  for (const work of worksObj) {
    const s3 = Bucket.getClient();

    const params = {
      Bucket: Bucket.getName(),
      Key: work.src,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    work.src = url;
  }

  res.status(200).json({
    status: 'sucess',
    results: worksObj.length,
    data: {
      works: worksObj,
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
  let update = req.body;

  if (req.file) {
    req.body.fileName = req.file.filename;
    update = {
      [`${req.body.fieldToPatch}`]: req.body.fileName,
    };

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.file.filename,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const s3 = Bucket.getClient();

    const command = new PutObjectCommand(params);

    await s3.send(command);
  }

  const updatedWork = await Work.findByIdAndUpdate(req.params.id, update, {
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

exports.resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `${req.file.originalname
    .split('.')
    .at(0)}-${Date.now()}.jpeg`;

  const newBuffer = await sharp(req.file.buffer)
    .resize(786, 409)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  req.file.buffer = newBuffer;

  next();
};
