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
        required: true
    },
    subcategory: {
        type: mongoose.ObjectId,
        ref: 'Subcategory'
    },
    brand: {
        type: mongoose.ObjectId,
        ref: 'brand'
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
    photo: {
        type: Buffer,
        contentType: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);