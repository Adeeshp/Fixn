import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";

function JobPostingList({ jobPost, type }) {
  const { user } = useContext(UserContext);
  const [taskList, setTaskList] = useState([]); // State for tasks
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [categories, setCategories] = useState({}); // To store category data by job ID
  const [subCategories, setSubCategories] = useState({}); // To store sub category data by job ID
  const [requestsByTaskId, setRequestsByTaskId] = useState({}); // Store requests by taskId

  useEffect(() => {
    if (user && user.role === "normal") {
      getTaskByUserId();
    } else {
      getTaskList();
    }
  }, [user]);

  const getTaskByUserId = async () => {
    try {
      const response = await fetch(`/api/task/${user._id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setTaskList(data.data); // Assuming the task array is in `data.tasks`
        // Fetch categories for each task
        data.data.forEach((job) => {
          if (job.categoryId && !categories[job._id]) {
            getCategoryById(job.categoryId, job._id);
          }

          if (job.subCategoryId && !subCategories[job._id]) {
            getSubCategoryById(job.subCategoryId, job._id);
          }

          getRequestsByTaskId(job._id);
        });
      } else {
        setError(data.message || "Unable to fetch tasks");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  const getTaskList = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setTaskList(data.data); // Assuming the task array is in data.tasks
        // Fetch categories for each task
        data.data.forEach((job) => {
          if (job.categoryId && !categories[job._id]) {
            getCategoryById(job.categoryId, job._id);
          }
          if (job.subCategoryId && !subCategories[job._id]) {
            getSubCategoryById(job.subCategoryId, job._id);
          }

          getRequestsByTaskId(job._id);
        });
      } else {
        setError(data.message || "Unable to fetch tasks");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };
  

  const getCategoryById = async (categoryId, jobId) => {
    try {
      const response = await fetch(`/api/category/${categoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setCategories((prevCategories) => ({
          ...prevCategories,
          [jobId]: data.category, // Store category by job ID
        }));
      } else {
        console.error("Failed to fetch category data");
      }
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  const getSubCategoryById = async (subCategoryId, jobId) => {
    try {
      const response = await fetch(`/api/sub_category/${subCategoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setSubCategories((prevSubCategories) => ({
          ...prevSubCategories,
          [jobId]: data.data, // Store subcategory by job ID
        }));
      } else {
        console.error("Failed to fetch sub category data");
      }
    } catch (err) {
      console.error("Sub Category fetch error:", err);
    }
  };

  // Fetch all requests for a given taskId
  const getRequestsByTaskId = async (taskId) => {
    try {
      const response = await fetch(`/api/requests/task/${taskId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setRequestsByTaskId((prevRequests) => ({
          ...prevRequests,
          [taskId]: data.data, // Store requests by taskId
        }));
      } else {
        console.error("Failed to fetch requests for task");
      }
    } catch (err) {
      console.error("Request fetch error:", err);
    }
  };

  const JobPostingCard = ({ isServiceProvider, job }) => {
    const imageUrl = job.image
      ? URL.createObjectURL(new Blob([job.image.buffer]))
      : null;

    // proposal should be greater than 0
    // user should be service provider
    // userId is matched with login user

    const isMyJob = job.userId._id === user._id;

    const isApplied = requestsByTaskId[job._id]?.some((request) => {
        return request.userId._id === user._id  && requestsByTaskId[job._id].length > 0;
    });
    return (
      <div className="border rounded-lg p-4 mb-5">
        <div className="flex gap-4">
          <Image
            src={imageUrl}
            alt="image"
            width={150}
            height={160}
            className="rounded-lg object-cover"
          />
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between">
              {/* Display category name or loading text */}
              <h2 className="font-bold">
                {categories[job._id]?.categoryName || "Loading category..."},
                {subCategories[job._id]?.subCategoryName ||
                  "Loading SubCategory..."}
              </h2>
              <h4 className="text-gray-500 text-sm">
                Posted {calculateTimeAgo(job.createdAt)}
              </h4>
            </div>
            {isServiceProvider && isMyJob === false && (
              <a href="./profile">
                <h2 className="flex gap-2 text-primary hover:font-bold">
                  <User /> {job.userId.firstname} {job.userId.lastname}
                </h2>
              </a>
            )}
            <div className="flex flex-row gap-4">
              <h2 className="flex gap-2 text-gray-500">
                <MapPin className="text-primary" />
                {job.address}, {job.city}, {job.country}, {job.zipcode}
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <Calendar className="text-primary" />
                <DateFormatter
                  formatter="MMM d, yyyy"
                  isoDate={job.createdAt}
                />
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin className="text-primary" />
                {"Number of proposal: "}
                {requestsByTaskId[job._id]?.length || 0}
              </h2>
            </div>
            <h2 className="text-gray-500 text-sm">{job.description}</h2>
            {/* Show "isApplied" if the conditions are met */}
            {isServiceProvider && isApplied && (
              <h2 className="flex gap-2 text-primary hover:font-bold">
                isApplied
              </h2>
            )}
            {isServiceProvider && isMyJob && (
                <h2 className="flex gap-2 text-primary hover:font-bold">
                My Job
              </h2>
            )
            }
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {taskList.length > 0 ? (
        taskList.map((job) => (
          <div key={job._id}>
            {job.status === "created" ? (
              user && user.role === "normal" ? (
                <JobPostingCard
                  key={job._id}
                  job={job}
                  isServiceProvider={false}
                />
              ) : (
                user.city?.trim().toLowerCase() ===
                  job.city?.trim().toLowerCase() && (
                  <JobPostingCard
                    key={job._id}
                    job={job}
                    isServiceProvider={true}
                  />
                )
              )
            ) : (
              <div>
                <h2>Test1</h2>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="h-[120px] w-full">No Data Found</div>
      )}
    </div>
  );
}

export default JobPostingList;
