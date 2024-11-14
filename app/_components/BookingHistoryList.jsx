import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
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


function BookingHistoryList({ bookingHistory, type }) {

    //   const cancelAppointment=(booking)=>{
    //       GlobalApi.deleteBooking(booking.id).then(resp=>{
    //         if(resp)
    //         {
    //           toast('Booking Delete Successfully!')
    //         }
    //       },(e)=>{
    //         toast('Error while canceling booking!')
    //       })
    //   }

    return (
        <div className='gap-2'>
            {/* {bookingHistory.map((booking,index)=>( */}
            <div className='border rounded-lg p-4 mb-5'>
                {/* <div key={index} className='flex gap-4  '> */}
                <div className='flex gap-4  '>
                    {/* {booking?.businessList?.name&&
              <Image src={booking?.businessList?.images[0]?.url} */}
                    <Image src=""
                        alt='image'
                        width={120}
                        height={120}
                        className='rounded-lg object-cover'
                    />
                    {/* } */}
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-bold'>
                            {/* {booking.businessList.name} */}
                            Cleaning
                        </h2>
                        <h2 className='flex gap-2 text-primary'> <User />
                            {/* {booking.businessList.contactPerson} */}
                            John Doe
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary' />
                            {/* {booking.businessList.address} */}
                            300 Uni Avennue, Waterloo
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'>
                            <Calendar className='text-primary' />
                            <span className='text-black'>
                                {/* {booking.date} */}
                                16-11-2024
                            </span></h2>
                        <h2 className='flex gap-2 text-gray-500'>
                            <Clock className='text-primary' />
                            <span className='text-black'>
                                {/* {booking.time} */}
                                16:00
                            </span></h2>

                    </div>
                </div>

                {/* <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button
                    variant="outline"
                        className="mt-5 w-full border-red-300 ">Cancel Appointment</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                onClick={()=>cancelAppointment(booking)}
                >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog> */}

            </div>

            <div className='border rounded-lg p-4 mb-5'>
                {/* <div key={index} className='flex gap-4  '> */}
                <div className='flex gap-4  '>
                    {/* {booking?.businessList?.name&&
              <Image src={booking?.businessList?.images[0]?.url} */}
                    <Image src=""
                        alt='image'
                        width={120}
                        height={120}
                        className='rounded-lg object-cover'
                    />
                    {/* } */}
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-bold'>
                            {/* {booking.businessList.name} */}
                            Cleaning
                        </h2>
                        <h2 className='flex gap-2 text-primary'> <User />
                            {/* {booking.businessList.contactPerson} */}
                            Chris Stewart
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary' />
                            {/* {booking.businessList.address} */}
                            300 Uni Avennue, Waterloo
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'>
                            <Calendar className='text-primary' />
                            <span className='text-black'>
                                {/* {booking.date} */}
                                06-11-2024
                            </span></h2>
                        <h2 className='flex gap-2 text-gray-500'>
                            <Clock className='text-primary' />
                            <span className='text-black'>
                                {/* {booking.time} */}
                                16:00
                            </span></h2>

                    </div>
                </div>
            </div>

            {/* ))} */}
        </div>
    )
}

export default BookingHistoryList