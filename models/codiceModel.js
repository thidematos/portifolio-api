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
  cover: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia o modelo de usuário (opcional)
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  numLikes: Number,
  toReadLater: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  numReadLater: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  usedImages: [String],
});

codiceSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.numLikes = this.likes.length;
  this.numReadLater = this.toReadLater.length;
  next();
});

codiceSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name photo',
  });

  next();
});

const Codice = mongoose.model('Codice', codiceSchema);

module.exports = Codice;
