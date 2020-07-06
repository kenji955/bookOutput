import mongoose = require('mongoose');
import uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
