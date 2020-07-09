import mongoose = require("mongoose");
import uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    userId: { type: String },
    bookId: { type: String },
    name: { type: String },
    author: { type: String },
    image: { type: String },
    publishedDate: { type: String },
    description: { type: String },
});

bookSchema.plugin(uniqueValidator);

export default mongoose.model("book", bookSchema);
