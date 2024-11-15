import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    zipcode: {
        type: String
    },
    imageURL: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    categoryId: {
        type: Number
    },
    subCategoryId: {
        type: Number
    },
    role: {
        type: String,
        enum: ['normal', 'serviceProvider'], 
        required: true
    },
    certificatePath: { 
        type: String 
    }, 
    wageType: {
        type: String,
        enum: ['hourly', 'fixed']
    },
    wage: {
        type: Number
    },
    documentId: {
        type: Number
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);
export default User;
