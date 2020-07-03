import mongoose = require('mongoose');
import uniqueValidator = require('mongoose-unique-validator');

// const mongoose:any = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true}
});

bookSchema.plugin(uniqueValidator);

export default mongoose.model('book', bookSchema);