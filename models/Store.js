import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    enterprise:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enterprise"
    }
})

const Store = mongoose.model("Store", storeSchema);
export default Store;