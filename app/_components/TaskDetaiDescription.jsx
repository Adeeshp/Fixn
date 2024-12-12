import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";
import { Truck, Clock, Hourglass, Calendar, MapPin, User, FileText } from "lucide-react";
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
    <div className="relative w-full bg-white p-8 shadow-lg rounded-lg">
      <div className="flex flex-row mb-5">

        {!job.image ? (
          <div className="w-[140px] height-[120px] relative rounded-lg overflow-hidden">
            <Image
              src={URL.createObjectURL(new Blob([job.image.buffer]))}
              alt="Job Image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-[140px] height-[120px] bg-slate-200 rounded-lg animate-pulse flex items-center justify-center">
            <div className="relative w-1/3 h-1/3">
              <Image
                src="/fixn.svg"
                alt="fixn-logo"
                fill
                className="object-contain filter grayscale"
              />
            </div>
          </div>
        )}

        <div className="pl-6">
          {/* <h1 className="text-4xl font-bold text-gray-800 mb-6">Task Details</h1> */}
          <h2 className="text-4xl font-semibold text-gray-700">
            {job.categoryId?.categoryName || "Loading Category..."}
          </h2>
          <h2 className="text-2xl text-gray-500 mb-4">
            {job.subCategoryId?.subCategoryName || "Loading Sub-Category..."}
          </h2>

          <a href="./profile">
            <h2 className="flex text-primary hover:font-bold">
              <User className="py-1 ml-[-5px]" />
              {job.userId.firstname} {job.userId.lastname}
            </h2>
          </a>

          <p className="text-gray-500 leading-relaxed mb-6">{job.description}</p>
        </div>

      </div>

      <div className="relative bg-gray-50 px-6 py-8 mt-10 rounded-lg shadow-lg">
        <div className="absolute w-full top-[-15px] left-0">
          <div className="flex justify-between px-5 drop-shadow-[0_4px_3px_rgba(0,0,0,0.25)]">
            {/* <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                "job.isAccepted"
                ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
            >
              {"job.isAccepted" ? "Accepted" : "Rejected"}
            </span> */}

            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Posted {calculateTimeAgo(job.createdAt)}
            </span>
            <h2 className="text-primary text-bold bg-gray-100 px-2 py-1 rounded">
                {job.requestId?.length || 0} Proposal{job.requestId?.length > 1 && `s`}
            </h2>

          </div>
        </div>
        <div grid grid-cols-2 gap-4 mb-4>
          <h2 className="flex text-gray-500 text-md mb-2">
            <MapPin className="text-primary mr-2 ml-[-5px]"/>
            {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <p className="text-gray-500 flex items-center">
            {/* <FaClock className="mr-2 text-gray-600" /> */}
            {/* <Hourglass className="text-primary mr-2 ml-[-5px]"/>
            <strong>Estimated Time : &nbsp;</strong> {job.estimatedTime} */}

            <Calendar className="text-primary mr-2 ml-[-5px]" />
            <strong className="text-primary">Date : &nbsp;</strong><DateFormatter formatter="MMM d, yyyy" isoDate={job.taskStartTime} />
          </p>
          <p className="text-gray-500 flex items-center">
            {/* <FaClock className="mr-2 text-gray-600" /> */}
            <Hourglass className="text-primary py-[2px] mr-2 ml-[-5px]"/>
            <strong className="text-primary">Estimated Time : &nbsp;</strong> {job.estimatedTime}
          </p>
          <p className="text-gray-500 flex items-center">
            <Clock className="text-primary mr-2 ml-[-5px]" />
            <strong className="text-primary">Start Time : &nbsp;</strong><DateFormatter formatter="h:mm a" isoDate={job.taskStartTime} />
          </p>
          <p className="text-gray-500 flex items-center">
            <Clock className="text-primary mr-2 ml-[-5px]" />
            <strong className="text-primary">End Time : &nbsp;</strong><DateFormatter formatter="h:mm a" isoDate={job.taskEndTime} />
          </p>
          <p className="text-gray-500 flex items-center">
            <Truck className="text-primary mr-2 ml-[-5px]" />
            {/* <Truck className="mr-2 text-gray-600" /> */}
            <strong className="text-primary">Transport Required : &nbsp;</strong>{" "}
            {job.transportRequired ? "Yes" : "No"}
          </p>
          <button
            className="absolute bottom-4 right-4 bg-secondary hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
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
                    {job.categoryId?.categoryName}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Location</td>
                  <td className="border px-4 py-2 text-right">
                  {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Date</td>
                  <td className="border px-4 py-2 text-right">
                    <DateFormatter
                      formatter="MMM d, yyyy"
                      isoDate={job.taskStartTime}
                    />
                  </td>
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
