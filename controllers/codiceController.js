const catchAsync = require('./../utils/catchAsync');
const Codice = require('./../models/codiceModel');
const sharp = require('sharp');
const ApiFeatures = require('./../utils/apiFeatures');
const deleteFile = require('./../utils/deleteFileFs');

exports.verifyImgContent = catchAsync(async (req, res, next) => {
  if (!req.files || !req.body.html) return next();

  const actualCodice = await Codice.findById(req.params.id);

  if (req.body.cover) deleteFile(actualCodice.cover, next);

  if (req.body.html) {
    const newUsedImages = actualCodice.usedImages.filter((imgName) =>
      req.body.html.includes(imgName)
    );

    const imagesToDelete = actualCodice.usedImages.filter(
      (imgName) => !req.body.html.includes(imgName)
    );

    if (imagesToDelete.length > 0)
      imagesToDelete.forEach((img) => deleteFile(img.replace('/', ''), next));

    if (!req.body.imagesNames) req.body.imagesNames = newUsedImages;
    else req.body.imagesNames = req.body.imagesNames.concat(newUsedImages);
  }

  next();
});

exports.patchCodice = catchAsync(async (req, res, next) => {
  const patch = {};
  //Title, Cover, Content, usedImages, Category

  if (req.body.html) {
    patch.content = req.body.html;
    patch.usedImages = req.body.imagesNames;
  }

  if (req.body.title) {
    patch.title = req.body.title;
  }

  if (req.body.cover) {
    patch.cover = req.body.cover;
  }

  if (req.body.category) {
    patch.category = req.body.category;
  }

  const codice = await Codice.findByIdAndUpdate(req.params.id, patch, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'sucess',
    data: {
      codice: codice,
    },
  });
});

exports.createCodice = catchAsync(async (req, res, next) => {
  const newCodice = await Codice.create({
    title: req.body.title,
    content: req.body.html,
    summary: req.body.summary,
    author: req.user._id,
    cover: req.body.cover,
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
    results: codices.length,
    data: {
      codices: codices,
    },
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Codice.find({}).select('category -_id');

  res.status(200).json({
    status: 'sucess',
    data: {
      categories,
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
  if (!req.files) return next();

  const sizes = {
    width: 1080,
    height: 720,
  };

  if (req.files.cover) {
    const coverName = `codice-cover-${Date.now()}.jpg`;

    await sharp(req.files.cover[0].buffer)
      .resize(sizes.width, sizes.height)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`client/public/${coverName}`);

    req.body.cover = coverName;
  }

  ///////////////////////////////////////////

  if (req.files.images) {
    req.body.imagesNames = [];

    await Promise.all(
      req.files.images.map(async (img, ind) => {
        let imgName = `codice-${ind}-${Date.now()}.jpg`;

        await sharp(img.buffer)
          .resize(sizes.width, sizes.height)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`client/public/${imgName}`);

        imgName = `/${imgName}`;

        req.body.imagesNames.push(imgName);
      })
    );
  }

  next();
});

exports.replaceImgSrc = (req, res, next) => {
  if (!req.body.imagesInfo) return next();

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

  next();
};
