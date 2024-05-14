const mongoose = require('mongoose');
const validator = require('validator');

const projectRequestSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: validator.isEmail,
  },
  position: {
    required: true,
    type: String,
  },
  company: {
    required: true,
    type: String,
  },
  budget: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },

  Answers: [
    {
      sendAt: {
        type: Date,
        default: Date.now,
      },
      content: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
    },
  ],

  currentProject: {
    type: Boolean,
    default: false,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },

  schedules: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Schedule',
  },
});

projectRequestSchema.pre('save', function (next) {
  const values = ['R$500 - 1k', 'R$1k - 1.5k', 'R$1.5k - 2k'];

  if (!values[this.budget - 1]) return next();

  this.budget = values[this.budget - 1];

  next();
});

projectRequestSchema.pre(/^find/, function (next) {
  this.select('-__v');

  this.populate({
    path: 'schedules',
  });

  next();
});

const ProjectRequest = mongoose.model('ProjectRequest', projectRequestSchema);

module.exports = ProjectRequest;
