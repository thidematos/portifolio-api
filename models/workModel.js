const mongoose = require('mongoose');
const slugify = require('slugify');

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

  year: {
    type: String,
    required: true,
  },
  abilities: {
    type: String,
    required: true,
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
    select: false,
  },
  slug: String,
  viewOrder: {
    type: Number,
  },
  projectLogo: {
    type: String,
    required: true,
  },
});

workSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
