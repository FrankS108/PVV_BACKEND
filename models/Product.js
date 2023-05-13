import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: false,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true,
        trim: true
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    tags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        },
    ]
},{
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
export default Product;