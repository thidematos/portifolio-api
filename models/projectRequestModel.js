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
    enum: ['1', '2', '3'],
  },
  description: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  isAnswered: {
    type: Boolean,
    default: false,
    select: false,
  },
});

projectRequestSchema.pre('save', function (next) {
  const values = ['R$500 - 1k', 'R$1k - 1.5k', 'R$1.5k - 2k'];
  this.budget = values[this.budget - 1];

  next();
});

projectRequestSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const ProjectRequest = mongoose.model('ProjectRequest', projectRequestSchema);

module.exports = ProjectRequest;
