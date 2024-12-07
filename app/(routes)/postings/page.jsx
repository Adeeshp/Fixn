"use client";
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from '@/app/_components/BookingHistoryList';
import JobPostingList from '@/app/_components/JobPostingList';
// import GlobalApi from '@/app/_services/GlobalApi';
// import { useSession } from 'next-auth/react';
// import moment from 'moment';

function MyBooking() {

    // const {data}=useSession();
    // const [bookingHistory,setBookingHistory]=useState([]);
    // useEffect(()=>{
    //     data&&GetUserBookingHistory();
    // },[data])

    /**
     * Used to Get User Booking History
     */
    // const GetUserBookingHistory=()=>{
    //     GlobalApi.GetUserBookingHistory(data.user.email).then(resp=>{
    //         console.log(resp);
    //         setBookingHistory(resp.bookings);
    //     })
    // }

    // const filterData=(type)=>{
    //     const result=bookingHistory.filter(item=>
    //         type=='booked'?
    //         new Date(item.date)>=new Date()
    //         :new Date(item.date)<=new Date());

    //         return result;
    // }

    return (
        <div className='pt-24 pb-20 mx-20 flex flex-row'>
            <div className='pr-5 row w-8/12'>
                <h2 className='font-bold text-[20px] my-2'>Job Postings</h2>
                <JobPostingList/>
            </div>
            <div className='pl-5 w-4/12 border-l-2 border-primary'>
                <h2 className='font-bold text-[20px] my-2'>My Bookings</h2>
                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="w-full justify-start h-11">
                        <TabsTrigger value="upcoming" className="flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:text-primary rounded-md cursor-pointer text-slate-600 bg-inherit">Upcoming</TabsTrigger>
                        <TabsTrigger value="ongoing" className="flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:text-primary rounded-md cursor-pointer text-slate-600 bg-inherit">Ongoing</TabsTrigger>
                        <TabsTrigger value="completed"className="flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out data-[state=active]:border-l-4 data-[state=active]:border-primary data-[state=active]:text-primary rounded-md cursor-pointer text-slate-600 bg-inherit">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                        <BookingHistoryList
                        // bookingHistory={filterData('upcoming')}
                        // type='booked'
                        />
                    </TabsContent>
                    <TabsContent value="ongoing">
                        <BookingHistoryList
                        // bookingHistory={filterData('ongoing')}
                        // type='booked'
                        />
                    </TabsContent>
                    <TabsContent value="completed">
                        <BookingHistoryList
                        // bookingHistory={filterData('completed')}
                        // type='completed'
                        />

                    </TabsContent>
                </Tabs>

                

            </div>
        </div>
    )
}

export default MyBooking