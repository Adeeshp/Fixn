import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wageType: {
      type: String,
      enum: ["hourly", "fixed"],
      required: true,
    },
    wage: {
      type: Number,
      required: true,
    },
    requested_Status: {
      type: String,
      enum: ["Requested", "Accepted", "Rejected"],
      default: "Requested", // Optional: Set default status
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
