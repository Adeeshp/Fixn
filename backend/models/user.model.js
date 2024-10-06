import mongoose from "mongoose";
// import AutoIncrementFactory from 'mongoose-sequence';

// // Initialize AutoIncrement with mongoose
// const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
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
    wageType: {
        type: String,
        enum: ['hourly', 'fixed']
    },
    wage: {
        type: Number
    },
    documentId: {
        type: Number
    },
    accessToken: {
        type: String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Apply AutoIncrement plugin to auto-increment userId field
// userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// Export the User model
const User = mongoose.model('User', userSchema);
export default User;

