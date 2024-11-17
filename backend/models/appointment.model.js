import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    serviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
