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
    title,
    description,
    subTitle,
    year,
    abilities,
    link,
    src,
    mainImg,
    projectLogo,
    sectionImgs,
  } = req.body;

  const colors = JSON.parse(req.body.colors);
  const sections = JSON.parse(req.body.sections);

  const mappedSections = sections.map((section, ind) => {
    return {
      ...section,
      img: sectionImgs[ind],
    };
  });

  const viewOrder = await Work.countDocuments();

  const newWork = await Work.create({
    src,
    title,
    description,
    mainImg,
    subTitle,
    year,
    abilities,
    projectLogo,
    colors,
    link,
    viewOrder: viewOrder,
    sections: mappedSections,
  });

  res.status(201).json({
    status: 'sucess',
    data: newWork,
  });
});

exports.resizeMultipleImages = async (req, res, next) => {
  const sizes = {
    src: {
      width: 786,
      height: 409,
    },
    mainImg: {
      width: 369,
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

  const srcName = `src-${req.files.src[0].originalname
    .split('.')
    .at(0)}-${Date.now()}.jpg`;

  await sharp(req.files.src[0].buffer)
    .resize(sizes.src.width, sizes.src.height)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`client/public/${srcName}`);

  req.body.src = srcName;

  /////////////////////////////////

  const mainImgName = `mainImg-${req.files.mainImg[0].originalname
    .split('.')
    .at(0)}-${Date.now()}.jpg`;

  await sharp(req.files.mainImg[0].buffer)
    .resize(sizes.mainImg.width, sizes.mainImg.height)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`client/public/${mainImgName}`);

  req.body.mainImg = mainImgName;

  ////////////////////////////////////////
  const projectLogoName = `projectLogo-${req.files.projectLogo[0].originalname
    .split('.')
    .at(0)}-${Date.now()}.jpg`;

  await sharp(req.files.projectLogo[0].buffer)
    .resize(sizes.mainImg.width, sizes.mainImg.height)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`client/public/${projectLogoName}`);

  req.body.projectLogo = projectLogoName;

  ///////////////////////////////////////////

  req.body.sectionImgs = [];

  await Promise.all(
    req.files.sectionImg.map(async (img, ind) => {
      const imgName = `section-${ind}-${img.originalname
        .split('.')
        .at(0)}-${Date.now()}.jpg`;

      await sharp(img.buffer)
        .resize(sizes.img.width, sizes.img.height)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`client/public/${imgName}`);

      req.body.sectionImgs.push(imgName);
    })
  );

  next();
};

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
  const field = req.body.fieldToPatch || Object.keys(req.body).at(0);

  console.log(field);

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
        [`sections.$.${field}`]: req.file?.filename || req.body[field],
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
  const work = await Work.findById(req.params.id);

  const imagesToDelete = [
    work.src,
    work.mainImg,
    work.projectLogo,
    ...work.sections.map((section) => section.img),
  ];

  imagesToDelete.forEach((image) => {
    fs.unlink(`client/public/${image}`, (err) => {
      if (err)
        return next(
          new AppError('Não foi encontrado um arquivo antigo para excluir.')
        );
      console.log('Sucess deleted!');
    });
  });

  await work.deleteOne();

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

  const updateData = {
    title: req.body.title,
    description: req.body.description,
    img: req.file.filename,
  };

  const work = await Work.findById(id);

  work.sections.splice(Number(sectionIndex) + 1, 0, updateData);

  const updatedWork = await work.save();

  res.status(200).json({
    status: 'sucess',
    data: {
      works: updatedWork,
    },
  });
});

exports.deleteSection = catchAsync(async (req, res, next) => {
  const { id: workId, sectionId } = req.params;

  const work = await Work.findById(workId);

  const selectedSection = work.sections.id(sectionId);

  fs.unlink(`client/public/${selectedSection.img}`, (err) => {
    if (err)
      return next(
        new AppError('Não foi encontrado um arquivo antigo para excluir.')
      );
    console.log('Sucess deleted!');
  });

  selectedSection.deleteOne();

  await work.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
