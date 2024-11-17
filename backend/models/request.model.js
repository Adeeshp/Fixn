import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requesrId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
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
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
