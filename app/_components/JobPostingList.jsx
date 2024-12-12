import { Hourglass, Calendar, MapPin, User, FileText } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const JobPostingCard = ({ job, user, isServiceProvider }) => {
  // const imageUrl = job.image
  //   ? URL.createObjectURL(new Blob([job.image.buffer]))
  //   : "/default-image.jpg"; // Placeholder for missing images

  //   console.log(imageUrl);

  //Check if job is posted by the same user
  const isMyJob = job.userId._id === user._id;

  let isApplied = false;
  if (isServiceProvider) {
    isApplied =
      Array.isArray(job.requestId) &&
      job.requestId.some((request) => {
        return request.userId?._id === user._id;
      });
  }
  return (
    <div className="border drop-shadow bg-white rounded-lg p-4 mb-5 hover:scale-[101%] hover: transition-all ease-in-out ">
      <div className="flex gap-4">
        {job.image ? (
          <div className="w-[240px] aspect-[3/4] relative rounded-lg overflow-hidden">
            <Image
              src={URL.createObjectURL(new Blob([job.image.buffer]))}
              alt="Job Image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-[240px] aspect-[3/4] bg-slate-200 rounded-lg animate-pulse flex items-center justify-center">
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

        <div className="w-full flex flex-col gap-2">
          {/* Top-section */}
          <div className="flex justify-between">
            <div>
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
            <div className="flex gap-2">
              <h4 className="text-gray-500 text-sm p-1">
                Posted {calculateTimeAgo(job.createdAt)}
              </h4>
              <div className="flex flex-col justify-start">
                {/* Applied Badge */}
                {isServiceProvider && !isMyJob && isApplied && (
                  <h2 className="text-white bg-primary py-[7px] px-4 rounded-[20px] inline-block leading-none">
                    Applied
                  </h2>
                )}
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="w-full flex pt-5 flex-col gap-1">
            {/* User Name */}
            {isServiceProvider && !isMyJob ? (
              <a href="./profile">
                <h2 className="flex text-primary hover:font-bold">
                  <User className="py-1 ml-[-5px]" />
                  {job.userId.firstname} {job.userId.lastname}
                </h2>
              </a>
            ) : (
              <a href="./profile">
                <h2 className="flex text-secondary hover:font-bold">
                  <User className="py-1 ml-[-5px]" />
                  Posted by you
                </h2>
              </a>
            )}

            <h2 className="flex text-gray-500">
              <MapPin
                className={`${
                  isServiceProvider && !isMyJob
                    ? "text-primary"
                    : "text-secondary"
                } py-1 ml-[-5px]`}
              />
              {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
            </h2>

            <div className="flex flex-row gap-2 ">
              <h2 className="flex gap-2 items-center text-[14px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {/* Date */}
                <Calendar className="w-4 h-4" />
                <DateFormatter
                  formatter="MMM d, yyyy"
                  isoDate={job.taskStartTime}
                />
              </h2>
              {job.estimatedTime && (
                <h2 className="flex gap-2 items-center text-[14px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {/* Time */}
                  <Hourglass className="w-4 h-4" />
                  {`Estimated Time : ${job.estimatedTime}`}
                </h2>
              )}
              <h2 className="flex gap-2 items-center text-[14px] text-gray-700 font-bold bg-gray-100 px-2 py-1 rounded">
                {/* Proposals */}
                <FileText className="w-4 h-4" />
                {job.requestId?.length || 0} Proposal{job.requestId?.length > 1 && `s`}
              </h2>
            </div>
          </div>

          {/* Last Section */}
          <div></div>
          <div className="flex flex-row gap-2 justify-between">
            {/* Description */}
            <p className="text-gray-500 py-2 rounded text-sm w-[75%]">
              {job.description}
            </p>
            <div className="flex flex-col justify-end">
              <Link
                href={{
                  pathname: "/task-detail",
                  query: {
                    job: job._id,
                  },
                }}
                className={`${
                  isServiceProvider && !isMyJob
                    ? "bg-primary drop-shadow-[0_2px_3px_rgba(13,122,95,0.5)] hover:drop-shadow-[0_3px_3px_rgba(13,122,95,0.75)]"
                    : "bg-secondary hover:bg-secondary/90 drop-shadow-[0_2px_3px_rgba(61,52,139,0.5)] hover:drop-shadow-[0_3px_3px_rgba(61,52,139,0.75)]"
                }  px-5 py-2 text-white rounded-[10px] text-center inline-block`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function JobPostingList({ taskList = [], loading, error }) {
  const { user } = useContext(UserContext);

  if (loading) {
    return <div className="p-10 text-primary font-semibold text-xl text-center animate-pulse bg-gray-100 rounded-lg shadow-lg">Loading Tasks...</div>;
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
            <JobPostingCard
              key={job._id}
              job={job}
              user={user}
              isServiceProvider={false}
            />
          ) : (
            user?.city?.trim().toLowerCase() ===
              job.city?.trim().toLowerCase() && (
              <JobPostingCard
                key={job._id}
                job={job}
                user={user}
                isServiceProvider={true}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default JobPostingList;
