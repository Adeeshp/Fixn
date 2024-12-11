import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import GlobalApi from '@/app/_services/GlobalApi'

// import { toast } from 'sonner';


const BookingHistoryCard = ({ job, user, isServiceProvider }) => {
    //Check if job is posted by the same user
    const isMyJob = job.userId._id === user._id;

    return (
      <div className="gap-2">
        <div className="border rounded-lg p-4 mb-5">
          <div className="flex gap-4  ">
            <div className="w-[150px] h-[160px] bg-slate-200 rounded-lg animate-pulse flex items-center justify-center">
              <Image
                src="/fixn.svg"
                alt="fixn-logo"
                width={60}
                height={60}
                className="filter grayscale"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">
                {job.categoryId?.categoryName || "Loading category..."},
                {job.subCategoryId?.subCategoryName || "Loading SubCategory..."}
              </h2>
              <h2 className="flex gap-2 text-primary">
                {" "}
                <User />
                {isServiceProvider ? (
                  // If the user is a service provider, display the following
                  <a href="./profile">
                    <h2 className="flex gap-2 text-primary hover:font-bold">
                      <User /> {job.userId.firstname} {job.userId.lastname}
                    </h2>
                  </a>
                ) : (
                  // If not a service provider, filter for jobs where requested_Status is "Accepted"
                  (() => {
                    const acceptedJobs = job.filter(
                      (job) => job.requestId?.requested_Status === "Accepted"
                    );

                    return acceptedJobs.length > 0 ? (
                      <a href="./profile">
                        <h2 className="flex gap-2 text-primary hover:font-bold">
                          <User /> {job.requestId.firstname}{" "}
                          {job.userId.lastname}
                        </h2>
                      </a>
                    ) : (
                      // Fallback when there are no accepted jobs, still render profile
                      <a href="./profile">
                        <h2 className="flex gap-2 text-primary hover:font-bold">
                          <User /> {job.userId.firstname} {job.userId.lastname}
                        </h2>
                      </a>
                    );
                  })()
                )}
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                {" "}
                <h2 className="flex gap-2 text-gray-500">
                  <MapPin className="text-primary" />
                  {`${job.address}, ${job.city}, ${job.country}, ${job.zipcode}`}
                </h2>
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <Calendar className="text-primary" />
                <DateFormatter
                  formatter="MMM d, yyyy"
                  isoDate={job.createdAt}
                />
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <Clock className="text-primary" />
                {`Est Time ${job.estimatedTime}`}
              </h2>
            </div>
          </div>
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
    )
}

export default BookingHistoryList