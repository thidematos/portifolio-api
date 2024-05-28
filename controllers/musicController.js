const User = require('../models/userModel');
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
exports.likeMusic = catchAsync(async (req, res, next) => {
  const { musicId } = req.params;
  const music = await Music.findById(musicId);

  const user = await User.findById(req.user._id);

  if (req.body.goph) {
    const includes = music.gophers.includes(user._id);

    if (includes) {
      music.gophers = music.gophers.filter(
        (gophs) => String(gophs) !== String(user._id)
      );

      user.likedMusics = user.likedMusics.filter(
        (music) => String(music) !== String(musicId)
      );
    }

    if (!includes) {
      music.gophers.push(user._id);
      user.likedMusics.push(musicId);
    }
  }

  await music.save({ validateModifiedOnly: true });
  const updatedUser = await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
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
