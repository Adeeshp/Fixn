import { User } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
// import axios from "axios";
import DateFormatter from "./DateFormatter";
import convertDateToString from './convertDateToString';

const TaskDetailProposalCard = ({ job }) => {
    const arrRequest = job.requestId;
    const [loading, setLoading] = useState(null); // Tracks which provider's button is loading
    const [disabled, setDisabled] = useState({}); // Tracks which provider's button is disabled

    const handleProviderAction = async (providerId, startTime, action) => {
      // Show confirmation alert for accepting the job
      const appDate =  convertDateToString(startTime, 'MMM d, yyyy');
      const appTime =  convertDateToString(startTime, 'hh:mm a');

      if (
        action === "Accepted" &&
        !window.confirm("Are you sure you want to accept this job?")
      ) {
        return; // Exit if the user cancels
      }

      setLoading(providerId); // Start loading for the current provider
      const requestId = providerId; // assuming `provider.id` corresponds to `requestId`

      try {
        const endpoint =
          action === "Accepted"
            ? `/api/request/accept` // Accept request endpoint
            : `/api/request/reject`; // Reject request endpoint

        const requestBody = {
          requestId: requestId, // Send requestId in the body
          appointmentDate: (
            appDate
          ), // Format date if needed
          appointmentTime: (
            appTime
          ), // Format time if needed
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody), // Send the request body as a JSON string
        });

        const data = await response.json(); // Parse the JSON response

        if (response.ok && data.success) {
          // Disable the buttons for this provider after action
          setDisabled((prev) => ({
            ...prev,
            [providerId]: true,
          }));

          // Optionally, refresh the page or update state
          alert(data.message);
        } else {
          alert(data.message || "An error occurred");
        }
      } catch (error) {
        console.error("Error handling provider action:", error);
        alert("An error occurred, please try again.");
      } finally {
        setLoading(null); // End loading after the action is complete
      }
    };
    return (
        <div className="w-full bg-gray-50 px-6 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 drop-shadow">
          Proposals
        </h2>
        {arrRequest.map((provider) => (
          <div
            key={provider._id}
            className="border rounded-lg p-6 mb-6 bg-white shadow transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col bg-primary/80 self-start border-primary border-2 text-white drop-shadow rounded-[40px] p-1">
                  <User />
                  {/* <Image
                    src={provider.avatar}
                    alt={provider.userId?.firstname}
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-primary cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${provider.id}`)}
                  >
                    {provider.userId?.firstname} {" "} {provider.userId?.lastname}
                  </h3>
                  <p className="flex text-gray-500 text-sm inline gap-1">
                    <strong>Date & Time : </strong> <DateFormatter formatter="MMM d, yyyy" isoDate={job.taskStartTime} /> <DateFormatter formatter="h:mm a" isoDate={job.taskStartTime} />
                    {/* {provider.createdAt} */}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Status : </strong> {provider.requested_Status}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Price : </strong> {"$ "} {provider.wage} {"/"} {provider.wageType}
                  </p>
                  <p className="flex items-center text-sm">
                    <strong>Rating : </strong>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`ml-1 ${
                          i < provider.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </p>
                </div>
              </div>
//               <div>
//                 <button
//                   className="bg-primary text-white py-1 px-3 rounded-md mr-2 hover:bg-white hover:border-primary hover:text-primary hover:border-2"
//                   onClick={() => handleProviderAction(provider.id, "Accepted")}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="bg-red-700 text-white py-1 px-3 rounded-md hover:bg-white hover:border-red-700 hover:text-red-700 border-2"
//                   onClick={() => handleProviderAction(provider.id, "Rejected")}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
            <div>
              <button
                className="bg-primary hover:bg-green-600 text-white py-1 px-3 rounded-md mr-2"
                onClick={() =>
                  handleProviderAction(
                    provider._id,
                    job.taskStartTime,
                    "Accepted"
                  )
                }
                disabled={disabled[provider._id] || loading === provider._id}
              >
                {loading === provider._id ? "Loading..." : "Accept"}
              </button>
              <button
                className="bg-red-700 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                onClick={() =>
                  handleProviderAction(
                    provider._id,
                    job.taskStartTime,
                    "Rejected"
                  )
                }
                disabled={disabled[provider._id] || loading === provider._id}
              >
                {loading === provider._id ? "Loading..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function TaskDetailProposal({ taskList, loading, error }) {
  const { user } = useContext(UserContext);

  if (loading) {
    return <div className="p-10 text-primary font-semibold text-xl text-center animate-pulse bg-gray-100 rounded-lg shadow-lg">Loading Proposals...</div>;

  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (taskList.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <div>
      <TaskDetailProposalCard job={taskList} />
    </div>
  );
}

export default TaskDetailProposal;
