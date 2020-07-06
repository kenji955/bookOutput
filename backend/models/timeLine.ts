import mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timeLineSchema = new Schema({
    userId: { type: String, required: true },
    createTime: { type: Date, default: Date.now },
    value: { type: String, required: true, maxlength: 140 },
});


export default mongoose.model("timeLine", timeLineSchema);
