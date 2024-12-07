import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    image: {
      type: String,
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    status: {
      type: String,
      enum: ["ongoing", "completed", "upcoming", "cancelled", "created"],
      default: "created",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "requested", "paid"],
      default: "pending",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
    zipcode: {
      type: String,
      required: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
    estimatedTime: {  
      type: String,
    },
    transportRequired: {
      type: Boolean,
      default: false,
    },
    taskStartTime: {
      type: Date,
    },
    taskEndTime: {
      type: Date,
    },
    receiptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Receipt",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
