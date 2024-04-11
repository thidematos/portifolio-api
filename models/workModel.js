const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainImg: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  sections: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
  finalDetails: {
    year: {
      type: String,
      required: true,
    },
    abilities: {
      type: String,
      required: true,
    },
  },
  colors: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
