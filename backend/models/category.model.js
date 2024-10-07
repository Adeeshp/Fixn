import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import ObjectId from 'mongodb';

// Initialize AutoIncrement with mongoose
// const AutoIncrement = AutoIncrementFactory(mongoose);

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, // Mongoose's ObjectId
        auto: true,
       
    },
    categoryName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
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
    timestamps: true 
});

// Apply AutoIncrement plugin to categoryId
// categorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

// Model
const Category = mongoose.model('Category', categorySchema);
export default Category;
