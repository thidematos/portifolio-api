const mongoose = require('mongoose');
const slugify = require('slugify');
const codiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  slug: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia o modelo de usuário (opcional)
  },
  category: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  usedImages: [String],
});

codiceSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

const Codice = mongoose.model('Codice', codiceSchema);

module.exports = Codice;
