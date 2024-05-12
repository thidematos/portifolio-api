const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectRequest', // Referencia o modelo de usuário (opcional)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
