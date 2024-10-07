import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

// Initialize AutoIncrement with mongoose
// const AutoIncrement = AutoIncrementFactory(mongoose);

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
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});


// Apply AutoIncrement plugin to subCategoryId
// subCategorySchema.plugin(AutoIncrement, { inc_field: 'subCategoryId' });

// Model
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
