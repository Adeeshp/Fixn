"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "@/app/_components/BookingHistoryList";
import JobPostingList from "@/app/_components/JobPostingList";

function MyBooking() {
  const { user } = useContext(UserContext);
  const [createTaskList, setCreateTaskList] = useState([]); // State for all tasks
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedOrCancelledTasks, setCompletedOrCancelledTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state


  useEffect(() => {
    if (user) {
      if (user.role === "normal") {
        fetchTasksByUserId();
      } else {
        fetchAllTasks();
      }
    }
  }, [user]);

  const fetchTasksByUserId = async () => {
    try {
      const response = await fetch(`/api/task/${user._id}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data.success) {
        updateTaskLists(data.data);
      } else {
        setError(data.message || "Unable to fetch tasks");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data.success) {
        updateTaskLists(data.data);
      } else {
        setError(data.message || "Unable to fetch tasks");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskLists = (tasks) => {
    setCreateTaskList(tasks);
    setOngoingTasks(tasks.filter((task) => task.status === "ongoing"));
    setCompletedOrCancelledTasks(tasks.filter((task) => ["completed", "cancelled"].includes(task.status)));
    setUpcomingTasks(tasks.filter((task) => task.status === "upcoming"));
  };

  return (
    <div className="pt-24 pb-20 md:mx-20 mx-5 flex flex-col md:flex-row">
      <div className="md:min-h-[735px] overflow-hidden top-[2%] md:pr-5 row md:w-8/12 ">
        <h2 className="font-bold text-[20px] my-2">Job Postings</h2>
        <JobPostingList taskList={createTaskList} loading={loading} error={error} />
      </div>
      <div className="sticky md:h-[12vh] md:min-h-[735px] overflow-auto top-[2%] md:pl-5 md:w-4/12">
        <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full bg-primary/80 text-white justify-evenly h-11">
            <TabsTrigger value="upcoming" className="w-full tabs-trigger">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing" className="tabs-trigger w-full">Ongoing</TabsTrigger>
            <TabsTrigger value="completed" className="tabs-trigger w-full">Completed</TabsTrigger>
          </TabsList>
          <hr className="bg-primary/40 h-[4px] rounded mt-1 mb-[5px]"/>

          <TabsContent value="upcoming">
            <BookingHistoryList taskList={upcomingTasks} loading={loading} error={error} />
          </TabsContent>
          <TabsContent value="ongoing">
            <BookingHistoryList taskList={ongoingTasks} loading={loading} error={error} />
          </TabsContent>
          <TabsContent value="completed">
            <BookingHistoryList taskList={completedOrCancelledTasks} loading={loading} error={error} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyBooking;
