import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    logo: {
        type: Buffer,
        contentType: String
    }
});

export default mongoose.model('Brand', brandSchema);
