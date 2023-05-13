import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;