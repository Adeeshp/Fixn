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
            type: Buffer
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' // replace 'Category' with the actual model name for category
          },
          subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory' // replace 'SubCategory' with the actual model name for subcategory
          },
        role: {
            type: String,
            enum: ['normal', 'serviceProvider']
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
        documents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Document"
            }
        ]
    }, {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    });
    
    const User = mongoose.model("User", userSchema);
    export default User;
    
