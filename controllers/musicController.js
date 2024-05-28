const catchAsync = require('../utils/catchAsync');
const Music = require('./../models/musicModel');
const sharp = require('sharp');

exports.createMusic = catchAsync(async (req, res, next) => {
  const {
    music,
    cover,
    spotifyLink,
    youtubeLink,
    artist,
    album,
    encore,
    brief,
  } = req.body;

  const newMusic = await Music.create({
    music,
    cover,
    spotifyLink,
    youtubeLink,
    artist,
    album,
    encore,
    brief,
  });

  res.status(201).json({
    status: 'success',
    data: {
      music: newMusic,
    },
  });
});

exports.getAllMusics = catchAsync(async (req, res, next) => {
  const musics = await Music.find({}).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: {
      musics,
    },
  });
});

exports.resizeCover = catchAsync(async (req, res, next) => {
  const musicCover = `music-${req.body.music
    .toLowerCase()
    .replace(' ', '_')}-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(600, 400)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`client/public/${musicCover}`);

  req.body.cover = musicCover;

  next();
});
