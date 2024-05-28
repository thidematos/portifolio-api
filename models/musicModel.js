const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  music: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  spotifyLink: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  encore: {
    type: String,
    required: true,
  },
  brief: {
    type: String,
    required: true,
  },
  gophers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  numGophs: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

musicSchema.pre('save', function (next) {
  this.numGophs = this.gophers.length;

  next();
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
