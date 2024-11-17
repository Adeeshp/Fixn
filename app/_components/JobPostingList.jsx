import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function JobPostingList({ jobPost, type }) {
    const { user } = useContext(UserContext);

    const [taskList] = useState([]);

    useEffect(() => {
        getTaskList();
    }, []);

    const getTaskList = async () => {
        try {
          const response = await fetch("/api/tasks");
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          
          // Log the parsed JSON data
          console.log("Parsed Data:", data);
      
          if (data.success) {
            if (user.role === "normal") {
                if (data.length > 0) {
                    {data.map((booking,index)=>( 
                        <div></div>
                    ))}
                    if (data.status === "created") {

                    }
                    
                } else {
                    <div className='h-[120px] w-full'>
                        No Data Found
                    </div>                    
                }
                
                // {data.length > 0 ? if((category, index) => (
                //     <div></div>
                // )) : 
                //     [1,2,3,4,5,6].map((item,index)=>(
                //         <div key={index} className='h-[120px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                //     ))
                // }

            } else { // service provider
        
            }

          } else {
            console.error("Error fetching tasks:", data.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
    };

    
    return (
        <div className='gap-2'>
            {bookingHistory.map((booking,index)=>(
            <div className='border rounded-lg p-4 mb-5'>
                {/* <div key={index} className='flex gap-4  '> */}
                <div className='flex gap-4'>
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
                    <div className='w-full flex flex-col gap-2'>
                        <div className='flex flex-row justify-between'>
                            <h2 className='font-bold'>
                                {/* {booking.businessList.name} */}
                                Painting
                            </h2>
                            <div className='flex flex-row'>
                                <h4 className='text-gray-500 text-sm'>
                                    Posted 20min ago
                                </h4>
                                <h4 className='pl-2 text-primary text-sm'>
                                    Applied
                                </h4>
                            </div>
                        </div>
                        <a href='./profile'>    
                            <h2 className='flex gap-2 text-primary hover:font-bold'> <User />
                                {/* {booking.businessList.contactPerson} */}
                                Cathy Cooper
                            </h2>
                        </a>
                        <div className='flex flex-row gap-4'>
                            <h2 className='flex gap-2 text-gray-500'> 
                                <MapPin className='text-primary' />
                                {/* {booking.businessList.address} */}
                                80 Sunview St., Kitchener
                            </h2>
                            <h2 className='flex gap-2 text-gray-500'>
                                <Calendar className='text-primary' />
                                {/* {booking.date} */}
                                16-11-2024
                            </h2>
                            <h2 className='flex gap-2 text-gray-500'>
                                <Clock className='text-primary' />
                                {/* {booking.time} */}
                                13:00
                            </h2>
                        </div>
                        <h2 className='text-gray-500 pl-1 text-sm'>
                            Job description here Job description here Job description here Job description here Job description here Job description here Job description here Job description here Job description hereJob description hereJob description hereJob description hereJob description here
                        </h2>

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

            // <div className='border rounded-lg p-4 mb-5'>
            //     {/* <div key={index} className='flex gap-4  '> */}
            //     <div className='flex gap-4  '>
            //         {/* {booking?.businessList?.name&&
            //   <Image src={booking?.businessList?.images[0]?.url} */}
            //         {/* <div className="w-[150px] h-[160px] bg-slate-200 rounded-lg animate-pulse"></div> */}
            //         <Image src="https://www.oneflare.com.au/_next/image?url=https%3A%2F%2Fcontent-cdn.oneflare.com.au%2Fwp-content%2Fuploads%2F2023%2F10%2F13121747%2Fpaint-peeling-against-the-wall-1024x576.jpg&w=2048&q=100"
            //             alt='image'
            //             width={150}
            //             height={160}
            //             className='rounded-lg object-cover'
            //         />
            //         {/* } */}
            //         <div className='flex flex-col gap-2'>
            //             <h2 className='font-bold'>
            //                 {/* {booking.businessList.name} */}
            //                 Painting
            //             </h2>
            //             <h2 className='flex gap-2 text-primary'> <User />
            //                 {/* {booking.businessList.contactPerson} */}
            //                 Ricky Jhonson
            //             </h2>
            //             <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary' />
            //                 {/* {booking.businessList.address} */}
            //                 23 Queen Avenue, Waterloo
            //             </h2>
            //             <h2 className='flex gap-2 text-gray-500'>
            //                 <Calendar className='text-primary' />
            //                 <span className='text-black'>
            //                     {/* {booking.date} */}
            //                     16-11-2024
            //                 </span></h2>
            //             <h2 className='flex gap-2 text-gray-500'>
            //                 <Clock className='text-primary' />
            //                 <span className='text-black'>
            //                     {/* {booking.time} */}
            //                     11:00
            //                 </span></h2>

            //         </div>
            //     </div>
            // </div>

            ))}
        </div>
    )
}

// export default JobPostingList

// import React from "react";
 
// const jobs = [
//   {
//     id: 1,
//     title: "Painting",
//     organizer: "Cathy Cooper",
//     location: "80 Sunview St., Kitchener",
//     date: "16-11-2024",
//     time: "13:00",
//     area: "Indoor",
//     estimate: "3 hours",
//     applicants: 5,
//     image: "https://via.placeholder.com/100" // Replace with actual image URL
//   },
//   {
//     id: 2,
//     title: "Plumbing",
//     organizer: "John Doe",
//     location: "50 King St., Waterloo",
//     date: "20-11-2024",
//     time: "10:00",
//     area: "Outdoor",
//     estimate: "2 hours",
//     applicants: 3,
//     image: "https://via.placeholder.com/100" // Replace with actual image URL
//   },
//   // Add more job objects here...
// ];
 
// const JobPostingCard = ({ job }) => {
//   return (
// <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-4">
// <div className="p-4 flex flex-col sm:flex-row items-start gap-4">
//         {/* Job Image */}
// <img
//           src={job.image}
//           alt="Job Thumbnail"
//           className="w-24 h-24 object-cover rounded-lg"
//         />
//         {/* Job Details */}
// <div className="flex-grow">
// <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
// <p className="text-gray-600 text-sm flex items-center gap-2">
// <span className="font-medium text-green-600">{job.organizer}</span>
// </p>
// <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
// <span className="material-icons text-green-600">location_on</span>
//             {job.location}
// </p>
// <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
// <span className="material-icons text-green-600">calendar_today</span>
//             {job.date}
// <span className="ml-4 material-icons text-green-600">access_time</span>
//             {job.time}
// </p>
// <p className="text-gray-600 text-sm mt-2">
// <strong>Area:</strong> {job.area}
// </p>
// <p className="text-gray-600 text-sm mt-1">
// <strong>Estimated Time:</strong> {job.estimate}
// </p>
// </div>
// </div>
// <div className="px-4 py-2 flex justify-between items-center bg-gray-50 border-t">
// <p className="text-sm text-gray-600">
// <strong>People Applied:</strong> {job.applicants}
// </p>
// <button
//           onClick={() => alert(`Redirecting to details for Job ID: ${job.id}`)} // Replace with actual navigation logic
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
// >
//           View Details
// <span className="material-icons">arrow_forward</span>
// </button>
// </div>
// </div>
//   );
// };
 
// const JobPostings = () => {
//   return (
// <div className="p-6">
// <h1 className="text-2xl font-bold mb-6">Job Postings</h1>
//       {jobs.map((job) => (
// <JobPostingCard key={job.id} job={job} />
//       ))}
// </div>
//   );
// };
 
// export default JobPostings;

// has context menu


// has context menu