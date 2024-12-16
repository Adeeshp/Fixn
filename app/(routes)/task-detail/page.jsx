"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskDetailDescription from "@/app/_components/TaskDetaiDescription";
import TaskDetailProposal from "@/app/_components/TaskDetailProposal";
import TaskDetailRequest from "@/app/_components/TaskDetailRequest";
import { FaMapMarkerAlt, FaTruck, FaClock, FaStar, FaReceipt } from "react-icons/fa";

export default function TaskDetails({ searchParams }) {
  const { job } = searchParams || { job: "Unknown" };
  const { user } = useContext(UserContext);
  const [taskList, setTaskList] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tasks by job ID when the component mounts or when `user` changes
  useEffect(() => {
    if (user) {
      console.log("Fetching tasks for job:", job); // Debugging job ID
      fetchTasksByTaskId();
    }
  }, [user]);

  // Function to fetch tasks
  const fetchTasksByTaskId = async () => {
    setLoading(true); // Ensure loading state is set
    setError(null); // Reset error state
    try {
      const response = await fetch(`/api/tasks/${job}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("API Response:", data); // Log API response for debugging

      if (data.success) {
        setTaskList(data.data); // Update task list
      } else {
        setError(data.message || "Unable to fetch tasks");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row pt-24 md:pb-10 md:px-20 px-5 bg-gray-50 ">
        {/* Left Panel: Task Details */}
        <div className="flex-1 md:basis-1/2 p-4">
          <TaskDetailDescription
            taskList={taskList}
            loading={loading}
            error={error}
          />
        </div>

        {/* Right Panel: Conditional Component */}
        <div className="flex-1 md:basis-1/2 p-4">
          {user?.role === "normal" ? (
            <TaskDetailProposal
              taskList={taskList}
              loading={loading}
              error={error}
            />
          ) : (
            <TaskDetailRequest
              taskList={taskList}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}
