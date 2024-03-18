import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'Category'
  }
});

export default mongoose.model('Subcategory', subCategorySchema);
