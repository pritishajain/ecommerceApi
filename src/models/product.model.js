import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
    },
    subcategory: {
        type: mongoose.ObjectId,
        ref: 'Subcategory'
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
    ,
    image: {
        data: Buffer,
        contentType: String
    }
},
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);

