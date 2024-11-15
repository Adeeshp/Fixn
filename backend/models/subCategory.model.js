import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    subCategoryName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true 
});

// Model
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
