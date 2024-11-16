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


function JobPostingList({ jobPost, type }) {

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
                    
                    {/* <div className="w-[150px] h-[160px] bg-slate-200 rounded-lg animate-pulse"></div> */}

                    <Image src="https://cdn.shopify.com/s/files/1/0614/1470/3297/files/eduardo-goody-Ddaw0aqnwD4-unsplash_600x600.jpg?v=1687311988"
                        alt='image'
                        width={150}
                        height={160}
                        className='rounded-lg object-cover'
                    />
                    {/* } */}
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-bold'>
                            {/* {booking.businessList.name} */}
                            Painting
                        </h2>
                        <h2 className='flex gap-2 text-primary'> <User />
                            {/* {booking.businessList.contactPerson} */}
                            Cathy Cooper
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary' />
                            {/* {booking.businessList.address} */}
                            80 Sunview St., Kitchener
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
                                13:00
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
                    {/* <div className="w-[150px] h-[160px] bg-slate-200 rounded-lg animate-pulse"></div> */}
                    <Image src="https://www.oneflare.com.au/_next/image?url=https%3A%2F%2Fcontent-cdn.oneflare.com.au%2Fwp-content%2Fuploads%2F2023%2F10%2F13121747%2Fpaint-peeling-against-the-wall-1024x576.jpg&w=2048&q=100"
                        alt='image'
                        width={150}
                        height={160}
                        className='rounded-lg object-cover'
                    />
                    {/* } */}
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-bold'>
                            {/* {booking.businessList.name} */}
                            Painting
                        </h2>
                        <h2 className='flex gap-2 text-primary'> <User />
                            {/* {booking.businessList.contactPerson} */}
                            Ricky Jhonson
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary' />
                            {/* {booking.businessList.address} */}
                            23 Queen Avenue, Waterloo
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
                                11:00
                            </span></h2>

                    </div>
                </div>
            </div>

            {/* ))} */}
        </div>
    )
}

export default JobPostingList