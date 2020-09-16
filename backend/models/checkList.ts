import mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const checkListSchema = new Schema({
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    checkListId: {
        id: { type: String, required: true },
        value: { type: String, required: true },
        order: { type: String, required: true },
        checkFrag: { type: Boolean, required: true },
    },
});

export default mongoose.model("checkList", checkListSchema);
