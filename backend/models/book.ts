import mongoose = require('mongoose');
import uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // userId: { type: String, required: true },
  bookId: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true}
});

bookSchema.plugin(uniqueValidator);

export default mongoose.model('book', bookSchema);