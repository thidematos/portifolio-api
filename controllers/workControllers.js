const sharp = require('sharp');
const AppError = require('../utils/appError');
const Work = require('./../models/workModel');
const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');

exports.getAllWorks = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Work.find({}), req.query);

  const query = features.filter().sort().selectFields().paginate().mongoQuery;

  const works = await query;

  res.status(200).json({
    status: 'sucess',
    results: works.length,
    data: {
      works: works,
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
    year,
    abilities,
    projectLogo,
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
    year,
    abilities,
    projectLogo,
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
  let previousFile = null;

  if (req.file) {
    update = {
      [`${req.body.fieldToPatch}`]: req.file.filename,
    };

    const work = await Work.findById(req.params.id);
    previousFile = work[req.body.fieldToPatch];
  }

  const updatedWork = await Work.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });

  if (!updatedWork) return next(new AppError('Could not find this work', 404));

  if (req.file) {
    fs.unlink(`client/public/${previousFile}`, (err) => {
      if (err)
        return next(
          new AppError('Não foi encontrado um arquivo antigo para excluir.')
        );
      console.log('Sucess deleted!');
    });
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      works: updatedWork,
    },
  });
});

exports.patchSection = catchAsync(async (req, res, next) => {
  let previousFile = null;

  const { id: workId, sectionId } = req.params;
  const field = req.body.fieldToPatch;

  if (req.file) {
    const work = await Work.findById(workId);
    previousFile = work.sections.id(sectionId)[field];

    console.log('This is previousFile', previousFile);
  }

  const updatedWork = await Work.findOneAndUpdate(
    {
      _id: workId,
      'sections._id': sectionId,
    },
    {
      $set: {
        [`sections.$.${field}`]: req.file.filename,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedWork)
    return next(
      new AppError('Não foi encontrado nenhum projeto com esse ID', 404)
    );

  if (req.file) {
    fs.unlink(`client/public/${previousFile}`, (err) => {
      if (err)
        return next(
          new AppError('Não foi encontrado um arquivo antigo para excluir.')
        );
      console.log('Sucess deleted!');
    });
  }

  res.status(200).json({
    status: 'success',
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

  const sizes = {
    src: {
      width: 786,
      height: 409,
    },
    mainImg: {
      widht: 369,
      height: 680,
    },
    projectLogo: {
      width: 300,
      height: 300,
    },
    img: {
      width: 1000,
      height: 600,
    },
  };

  await sharp(req.file.buffer)
    .resize(
      sizes[req.body.fieldToPatch].width,
      sizes[req.body.fieldToPatch].height
    )
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`client/public/${req.file.filename}`);

  next();
};

exports.patchAddSection = catchAsync(async (req, res, next) => {
  const { sectionIndex } = req.query;
  const { id } = req.params;

  console.log('This is the sectionIndex:', sectionIndex);

  console.log('This is the ID:', id);

  console.log(`File:`, req.file);

  console.log(`Body:`, req.body);

  res.status(200).json({
    status: 'sucess',
    data: {
      works: 'oi',
    },
  });
});
