const mongoose = require('mongoose');

const { Schema } = mongoose;

const catSchema = new Schema({
  id: String,
  url: String,
  score: { type: Number, default: 1000 },
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
