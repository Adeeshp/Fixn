import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 200,
        required: true
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    documentData: {
        type: Buffer // To store binary data for files
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

// Create the model
const Document = mongoose.model("Document", documentSchema);
export default Document;

