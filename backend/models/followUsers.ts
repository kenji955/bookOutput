import mongoose = require('mongoose');

const Schema = mongoose.Schema;

const followUserSchema = new Schema({
  userId: { type: String, required: true },
  followUserId: { type: String, required: true },
  followTimeLine: { type: String, required: true }
});


export default mongoose.model('followUser', followUserSchema);
