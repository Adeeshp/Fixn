import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    categoryName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    },
    icon: {
        type: String
    }
}, {
    timestamps: true 
});

// Model
const Category = mongoose.model('Category', categorySchema);
export default Category;
