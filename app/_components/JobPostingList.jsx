import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";

const JobPostingCard = ({ job, user, isServiceProvider }) => {
  const imageUrl = job.image
    ? URL.createObjectURL(new Blob([job.image.buffer]))
    : "/default-image.jpg"; // Placeholder for missing images

    console.log(imageUrl);  

  //Check if job is posted by the same user
    const isMyJob = job.userId._id === user._id;

  let isApplied = false;
  if (isServiceProvider) {
    isApplied =
      Array.isArray(job.requestId) &&
      job.requestId.some((request) => {
        return request.userId === user._id;
      });
  }

  return (
    <div className="border rounded-lg p-4 mb-5">
      <div className="flex gap-4">
        <Image
          src={imageUrl}
          alt="Job Image"
          width={150}
          height={160}
          className="rounded-lg object-cover"
        />
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="font-bold">
              {job.categoryId?.categoryName || "Loading category..."},
              {job.subCategoryId?.subCategoryName || "Loading SubCategory..."}
            </h2>
            <h4 className="text-gray-500 text-sm">
              Posted {calculateTimeAgo(job.createdAt)}
            </h4>
          </div>
          {isServiceProvider && !isMyJob && (
            <a href="./profile">
              <h2 className="flex gap-2 text-primary hover:font-bold">
                <User /> {job.userId.firstname} {job.userId.lastname}
              </h2>
            </a>
          )}
          <div className="flex flex-row gap-4">
            <h2 className="flex gap-2 text-gray-500">
              <MapPin className="text-primary" />
              {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <Calendar className="text-primary" />
              <DateFormatter formatter="MMM d, yyyy" isoDate={job.createdAt} />
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              Proposals: {job.requestId?.length || 0}
            </h2>
          </div>
          <p className="text-gray-500 text-sm">{job.description}</p>
          {isServiceProvider && isApplied && (
            <h2 className="text-primary font-bold">Applied</h2>
          )}
          {isServiceProvider && isMyJob && (
            <h2 className="text-primary font-bold">My Job</h2>
          )}
        </div>
      </div>
    </div>
  );
};

function JobPostingList({ taskList = [], loading, error }) {
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
              <JobPostingCard
                key={job._id}
                job={job}
                user={user}
                isServiceProvider={false}
              />
            ) : (
              user.city?.trim().toLowerCase() ===
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
