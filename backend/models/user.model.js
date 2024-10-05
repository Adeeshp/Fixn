import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

// Initialize AutoIncrement with mongoose
const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 200
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 200
    },
    phoneNo: {
        type: Number,
        required: true,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        maxlength: 200
    },
    address: {
        type: String,
        maxlength: 1000
    },
    zipcode: {
        type: String,
        maxlength: 20 
    },
    imageURL: {
        type: String,
        maxlength: 1000
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], 
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    subCategoryId: {
        type: Number
    },
    role: {
        type: String,
        enum: ['normal', 'serviceProvider'], 
        required: true
    },
    wageType: {
        type: String,
        enum: ['hourly', 'fixed']
    },
    wage: {
        type: Number,
        maxlength: 10
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now 
    },
    documentId: {
        type: Number,
        maxlength: 10
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Apply AutoIncrement plugin to userId
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// Model
const User = mongoose.model('User', userSchema);
export default User;
