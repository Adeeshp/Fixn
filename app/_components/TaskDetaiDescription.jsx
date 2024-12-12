import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaClock,
  FaStar,
  FaReceipt,
} from "react-icons/fa";

const TaskDetailDescriptionCard = ({ job }) => {
  const [showReceipt, setShowReceipt] = useState(false);
  return (
    <div className="relative md:w-1/2 w-full bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Task Details</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        {job.categoryId?.categoryName || "Loading Category..."}
      </h2>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        {job.subCategoryId?.subCategoryName || "Loading Sub-Category..."}
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">{"task.description"}</p>
      {job.image ? (
        <div className="flex justify-center mb-6">
          <Image
            src={URL.createObjectURL(new Blob([job.image.buffer]))}
            alt="Job Image"
            fill
            className="w-full max-w-md h-56 object-cover rounded-lg shadow-lg"
          />
        </div>
      ) : (
        <div className="flex justify-center mb-6">
          <Image
            src="/fixn.svg"
            alt="fixn-logo"
            fill
            className="w-full max-w-md h-56 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <span className="text-gray-500">
            Posted {calculateTimeAgo(job.createdAt)}
          </span>
          {/* <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              "task.isAccepted"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {"task.isAccepted" ? "Accepted" : "Rejected"}
          </span> */}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <p className="text-gray-500 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <strong>Location:</strong> {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
          </p>
          <p className="text-gray-500">
            <strong>Proposals :</strong> {job.requestId?.length || 0}
          </p>
          <p className="text-gray-500 flex items-center">
            <FaClock className="mr-2 text-gray-600" />
            <strong>Estimated Time:</strong> ${job.estimatedTime}
          </p>
          <p className="text-gray-500 flex items-center">
            <FaClock className="mr-2 text-gray-600" />
            <strong>Start Time:</strong> {"task.startTime"}
          </p>
          <p className="text-gray-500 flex items-center">
            <FaClock className="mr-2 text-gray-600" />
            <strong>End Time:</strong> {"task.endTime"}
          </p>
          <p className="text-gray-500 flex items-center">
            <FaTruck className="mr-2 text-gray-600" />
            <strong>Transport Required:</strong>{" "}
            {job.transportRequired ? "Yes" : "No"}
          </p>
          <button
            className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
            onClick={() => setShowReceipt(true)}
          >
            <FaReceipt size={20} />
          </button>
        </div>
      </div>
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Invoice Receipt</h3>
            <table className="table-auto w-full text-sm">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Task Title</td>
                  <td className="border px-4 py-2 text-right">
                    {"task.title"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Location</td>
                  <td className="border px-4 py-2 text-right">
                    {"task.location"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Date</td>
                  <td className="border px-4 py-2 text-right">{"task.date"}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Service Charge</td>
                  <td className="border px-4 py-2 text-right">$100</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Transport Charge</td>
                  <td className="border px-4 py-2 text-right">$20</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Tax (10%)</td>
                  <td className="border px-4 py-2 text-right">$12</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Total Amount</td>
                  <td className="border px-4 py-2 text-right font-bold">
                    $132
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full"
              onClick={() => setShowReceipt(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function TaskDetailDescription({ taskList, loading, error }) {
  const { user } = useContext(UserContext);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TaskDetailDescriptionCard job={taskList} />
    </div>
  );
}

export default TaskDetailDescription;
