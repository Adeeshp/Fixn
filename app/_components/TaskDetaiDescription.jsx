import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";
import { Receipt, Truck, Clock, Hourglass, Calendar, MapPin, User, FileText } from "lucide-react";
import Link from "next/link";

const TaskDetailDescriptionCard = ({ job }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  if (job.image?.data) {
    const binaryData = new Uint8Array(job.image.data);
    const binaryString = Array.from(binaryData)
      .map((byte) => String.fromCharCode(byte))
      .join(""); // Convert binary data to string
      job.taskImage = `data:image/jpeg;base64,${btoa(binaryString)}`;
    
    // Log the image data for debugging
    console.log(`Task Image for ${job.id}: data:image/jpeg;base64,${btoa(binaryString)}`);
  } else {
    job.taskImage = "/images/male_avatar.jpg"; // Fallback image
  }

  return (
    <div className="relative w-full bg-gray-700 p-8 shadow-lg rounded-lg">
      <div className="flex flex-row mb-5">

        <div className="w-[140px] height-[120px] relative rounded-lg overflow-hidden">
            <Image
              src={job?.taskImage}
              alt="Job Image"
              fill
              className="object-cover"
            />
          </div>

        <div className="pl-6">
          {/* <h1 className="text-4xl font-bold text-gray-800 mb-6">Task Details</h1> */}
          <h2 className="text-4xl font-semibold text-white">
            {job.categoryId?.categoryName || "Loading Category..."}
          </h2>
          <h2 className="text-2xl text-gray-400 mb-4">
            {job.subCategoryId?.subCategoryName || "Loading Sub-Category..."}
          </h2>

          <Link href="./profile">
            <h2 className="flex hover:text-green-500 font-bold text-lgreen">
              <User className="py-1 ml-[-5px]" />
              {job.userId.firstname} {job.userId.lastname}
            </h2>
          </Link>

          <p className="text-gray-300 leading-relaxed mb-6">{job.description}</p>
        </div>

      </div>

      <div className="relative bg-white/70 px-5 pt-8 pb-4 mt-10 rounded-lg drop-shadow backdrop-blur-md border border-white/30">
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

            <span className="text-gray-300 bg-gray-500 px-2 py-1 rounded">
              Posted {calculateTimeAgo(job.createdAt)}
            </span>
            <h2 className="text-white text-bold bg-primary px-2 py-1 rounded">
                {job.requestId?.length || 0} Proposal{job.requestId?.length > 1 && `s`}
            </h2>

          </div>
        </div>
        <div grid grid-cols-2 gap-4 mb-4>
          <h2 className="flex bg-gray-300 p-2 rounded shadow-inner text-gray-500 text-md my-5">
            <div className="flex text-gray-600 w-[25%]">
              <MapPin className="text-primary mr-1 ml-[-5px] py-1"/>
              <strong>Location :</strong> 
            </div>
            {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2 pl-2">
          <p className="text-gray-500 flex items-center">
            <Calendar className="text-primary mr-1 ml-[-5px] py-1" />
            <strong className="text-gray-600">Date : &nbsp;</strong><DateFormatter formatter="MMM d, yyyy" isoDate={job.taskStartTime} />
          </p>
          <p className="text-gray-500 flex items-center">
            <Hourglass className="text-primary mr-1 ml-[-5px] py-1"/>
            <strong className="text-gray-600">Estimated Time : &nbsp;</strong> {job.estimatedTime}
          </p>
          <p className="text-gray-500 flex items-center">
            <Clock className="text-primary mr-1 ml-[-5px] py-1" />
            <strong className="text-gray-600">Start Time : &nbsp;</strong><DateFormatter formatter="h:mm a" isoDate={job.taskStartTime} />
          </p>
          <p className="text-gray-500 flex items-center">
            <Clock className="text-primary mr-1 ml-[-5px] py-1" />
            <strong className="text-gray-600">End Time : &nbsp;</strong><DateFormatter formatter="h:mm a" isoDate={job.taskEndTime} />
          </p>
          <p className="text-gray-500 flex items-center">
            <Truck className="text-primary mr-1 ml-[-5px] py-1" />
            <strong className="text-gray-600">Transport Required : &nbsp;</strong>{" "}
            {job.transportRequired ? "Yes" : "No"}
          </p>
          {/* <button
            className="absolute bottom-4 right-4 bg-secondary hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
            onClick={() => setShowReceipt(true)}
          >
            <Receipt size={20} />
          </button> */}
        </div>
      </div>
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl text-center font-bold mb-4">Invoice Receipt</h3>
            <table className="table-auto w-full text-sm">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Task Title</td>
                  <td className="border px-4 py-2 text-right">
                    {job.categoryId?.categoryName}
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
                  <td className="border px-4 py-2">Tax (13%)</td>
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
    return <div className="p-10 text-primary font-semibold text-xl text-center animate-pulse bg-gray-100 rounded-lg shadow-lg">Loading Task Details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (taskList.length === 0) {
    return <div>No tasks available.</div>;
  }
  
  return (
    <div>
      <TaskDetailDescriptionCard job={taskList} />
    </div>
  );
}

export default TaskDetailDescription;
