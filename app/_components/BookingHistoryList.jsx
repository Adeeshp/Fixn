import { ChevronRight, Hourglass, Calendar, MapPin, User, Clock } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";
import Link from "next/link";

const BookingHistoryCard = ({ job, user, isServiceProvider }) => {
  //Check if job is posted by the same user
  // const isMyJob = job.userId._id === user._id;
  return (
    <div className="gap-2">
      <div className="border rounded-lg drop-shadow bg-white p-4 mb-5">
        {/* <div className="flex w-full"> */}
        {/* <div className="w-[150px] h-[160px] bg-slate-200 rounded-lg animate-pulse flex items-center justify-center">
                        <Image
                            src="/fixn.svg"
                            alt="fixn-logo"
                            width={60}
                            height={60}
                            className="filter grayscale"
                        />
                    </div> */}
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between pb-2">
            <div className="">
              {/* Category */}
              <h4 className="font-bold text-[20px]">
                {job.categoryId?.categoryName || "Loading Category..."}
              </h4>
              {/* Sub-Category */}
              <h5 className="text-gray-500">
                {job.subCategoryId?.subCategoryName ||
                  "Loading Sub-Category..."}
              </h5>
            </div>
            <div className="flex flex-col justify-start">
              <Link
                href="/task-detail"
                className="rounded-[10px] border border- bg-white text-sm flex hover:drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] text-primary p-2"
              >
                View <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <h2 className="flex gap-1 text-primary">
            {isServiceProvider ? (
              // If the user is a service provider, display the following
              <a href="./profile">
                <h2 className="flex text-primary hover:font-bold">
                  <User className="py-1 ml-[-5px]" />
                  {job.userId.firstname} {job.userId.lastname}
                </h2>
              </a>
            ) : (
              // If not a service provider, filter for jobs where requested_Status is "Accepted"
              (() => {
                const hasAcceptedRequest = job.requestId?.some(
                  (request) => request.requested_Status === "Accepted"
                );

                return hasAcceptedRequest ? (
                  <a href="./profile">
                    <h2 className="flex text-primary hover:font-bold">
                      <User className="py-1 ml-[-5px]" />
                      {job.requestId[0]?.userId.firstname}{" "}
                      {job.requestId[0]?.userId.lastname}
                    </h2>
                  </a>
                ) : (
                  // Fallback when there are no accepted jobs, still render profile
                  <a href="./profile">
                    <h2 className="flex text-primary hover:font-bold">
                      <User className="py-1 ml-[-5px]" />
                      {job.userId.firstname} {job.userId.lastname}
                    </h2>
                  </a>
                );
              })()
            )}
          </h2>

          <h2 className="flex text-gray-500">
            <MapPin className="text-primary py-1 ml-[-5px]" />
            {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
          </h2>

          <div className="flex flex-row gap-2 pt-1">
            <h2 className="flex gap-2 items-center text-[14px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {/* Date */}
                <Calendar className="w-4 h-4" />
                <DateFormatter formatter="MMM d, yyyy" isoDate={job.taskStartTime} />
            </h2>
            <h2 className="flex gap-2 items-center text-[14px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {/* Time */}
                <Clock className="w-4 h-4" />
                <DateFormatter formatter="h:mm a" isoDate={job.taskStartTime} />
            </h2>
            {job.estimatedTime && (
            <h2 className="flex gap-2 items-center text-[14px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {/* Time */}
                <Hourglass className="w-4 h-4" />
                {job.estimatedTime}
            </h2>
            )}  
          </div> 
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

function BookingHistoryList({ taskList = [], loading, error }) {
  const { user } = useContext(UserContext);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!taskList.length) {
    return <div className="h-[120px] w-full text-center">No Jobs Found</div>;
  }

  return (
    <div>
      {taskList.map((job) => (
        <div key={job._id}>
          {user?.role === "normal" ? (
            <BookingHistoryCard
              key={job._id}
              job={job}
              user={user}
              isServiceProvider={false}
            />
          ) : (
            <BookingHistoryCard
              key={job._id}
              job={job}
              user={user}
              isServiceProvider={true}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default BookingHistoryList;
