const catchAsync = require('./../utils/catchAsync');
const Codice = require('./../models/codiceModel');
const sharp = require('sharp');
const ApiFeatures = require('./../utils/apiFeatures');

exports.createCodice = catchAsync(async (req, res, next) => {
  const newCodice = await Codice.create({
    title: req.body.title,
    content: req.body.html,
    summary: req.body.summary,
    author: req.user._id,
    cover: req.body.coverName,
    category: JSON.parse(req.body.categories),
    usedImages: req.body.imagesNames,
  });

  res.status(201).json({
    status: 'success',
    data: { newCodice },
  });
});

exports.getAllCodices = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Codice.find({}), req.query);

  const query = features.filter().sort().selectFields().paginate().mongoQuery;

  const codices = await query;

  res.status(200).json({
    status: 'success',
    data: {
      codices: codices,
    },
  });
});

exports.getCodice = catchAsync(async (req, res, next) => {
  const codice = await Codice.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      codice,
    },
  });
});

exports.resizeImages = catchAsync(async (req, res, next) => {
  const sizes = {
    width: 1080,
    height: 720,
  };

  const coverName = `codice-cover-${Date.now()}.jpg`;

  await sharp(req.files.cover[0].buffer)
    .resize(sizes.width, sizes.height)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`client/public/${coverName}`);

  req.body.coverName = coverName;

  ///////////////////////////////////////////

  req.body.imagesNames = [];

  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (img, ind) => {
        const imgName = `codice-${ind}-${Date.now()}.jpg`;

        await sharp(img.buffer)
          .resize(sizes.width, sizes.height)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`client/public/${imgName}`);

        req.body.imagesNames.push(imgName);
      })
    );
  }

  next();
});

exports.replaceImgSrc = (req, res, next) => {
  const imagesInfo = JSON.parse(req.body.imagesInfo);
  const html = JSON.parse(req.body.content).html;

  let finalStr = null;
  imagesInfo.forEach((info, ind) => {
    if (!html.includes(info.blob)) return;
    if (!finalStr)
      finalStr = html.replace(info.blob, req.body.imagesNames[ind]);
    finalStr = finalStr.replace(info.blob, req.body.imagesNames[ind]);
  });

  req.body.html = finalStr || html;

  console.log(req.body.html);
  next();
};
