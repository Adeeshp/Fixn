"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "@/app/_components/BookingHistoryList";
import JobPostingList from "@/app/_components/JobPostingList";
// import GlobalApi from '@/app/_services/GlobalApi';
// import { useSession } from 'next-auth/react';
// import moment from 'moment';

function MyBooking() {
  const { user } = useContext(UserContext);
  const [createTaskList, setCreateTaskList] = useState([]); // State for tasks
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedOrCancelledTasks, setCompletedOrCancelledTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  

  useEffect(() => {
    if (user && user.role === "normal") {
      getTaskByUserId();
    } else {
      getTaskList();
    }
  }, []);

  const getTaskByUserId = async () => {
    try {
      const response = await fetch(`/api/task/${user._id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        // console.log(data.data);
        setCreateTaskList(data.data); // Assuming the task array is in `data.data`
        setOngoingTasks(data.data.filter(task => task.status === "ongoing"));
        setCompletedOrCancelledTasks(data.data.filter(task => task.status === "completed" || task.status === "cancelled"));
        setUpcomingTasks(data.data.filter(task => task.status === "upcoming"));
        
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
        // console.log(data.data);
        setCreateTaskList(data.data); // Assuming the task array is in `data.data`
        setOngoingTasks(data.data.filter(task => task.status === "ongoing"));
        setCompletedOrCancelledTasks(data.data.filter(task => task.status === "completed" || task.status === "cancelled"));
        setUpcomingTasks(data.data.filter(task => task.status === "upcoming"));

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

  return (
    <div className="pt-24 pb-20 mx-20 flex flex-row">
      <div className="min-h-[735px] overflow-hidden top-[2%] pr-5 row w-8/12 ">
        <h2 className="font-bold text-[20px] my-2">Job Postings</h2>
        <JobPostingList taskList={createTaskList} loading={loading} error={error} />
      </div>
      <div className="sticky h-[12vh] min-h-[735px] overflow-auto top-[2%] pl-5 w-4/12">
        <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full justify-start h-11">
            <TabsTrigger
              value="upcoming"
              className="flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:text-primary rounded-md cursor-pointer text-slate-600 bg-inherit"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="ongoing"
              className="flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:text-primary rounded-md cursor-pointer text-slate-600 bg-inherit"
            >
              Ongoing
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:text-primary rounded-md cursor-pointer text-slate-600 bg-inherit"
            >
              Completed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <BookingHistoryList taskList={upcomingTasks}  loading={loading} error={error} />
          </TabsContent>
          <TabsContent value="ongoing">
            <BookingHistoryList taskList={ongoingTasks}  loading={loading} error={error} />
          </TabsContent>
          <TabsContent value="completed">
            <BookingHistoryList taskList={completedOrCancelledTasks}  loading={loading} error={error} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyBooking;
