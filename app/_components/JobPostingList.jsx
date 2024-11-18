import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import DateFormatter from './DateFormatter';
import { calculateTimeAgo } from './calculateTimeAgo';


function JobPostingList({ jobPost, type }) {
    const { user } = useContext(UserContext);
    const [taskList, setTaskList] = useState([]); // Add state for tasks
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        {user && user.role === "normal" ? (
            getTaskByUserId()
        ):(
            getTaskList()
        )}
    }, []);

    const getTaskByUserId = async () => {
        try {
            const response = await fetch(`/api/task/${user._id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                console.log('Adeesh');
                setTaskList(data.data); // Assuming the task array is in `data.tasks`
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
                console.log(data);
                setTaskList(data.data); // Assuming the task array is in `data.tasks`
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

    const JobPostingCard = ({ isServiceProvider ,job }) => {
        return (
            <div className='border rounded-lg p-4 mb-5'>
                <div className='flex gap-4'>
                    <Image
                        src="https://cdn.shopify.com/s/files/1/0614/1470/3297/files/eduardo-goody-Ddaw0aqnwD4-unsplash_600x600.jpg?v=1687311988"
                        alt='image'
                        width={150}
                        height={160}
                        className='rounded-lg object-cover'
                    />
                    <div className='w-full flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            <h2 className='font-bold'>Painting</h2>
                            <h4 className='text-gray-500 text-sm'>
                                Posted {calculateTimeAgo(job.createdAt)}
                            </h4>
                        </div>
                        {isServiceProvider && ( 
                            <a href='./profile'>
                            <h2 className='flex gap-2 text-primary hover:font-bold'>
                                <User /> Cathy Cooper
                            </h2>
                             </a>
                        )}
                        <div className='flex flex-row gap-4'>
                            <h2 className='flex gap-2 text-gray-500'>
                                <MapPin className='text-primary' />
                                {job.address}, {job.city}, {job.country}, {job.zipcode}
                            </h2>
                            <h2 className='flex gap-2 text-gray-500'>
                                <Calendar className='text-primary' />
                                <DateFormatter
                                    formatter="MMM d, yyyy"
                                    isoDate={job.createdAt}
                                />
                            </h2>
                        </div>
                        <h2 className='text-gray-500 text-sm'>{job.description}</h2>
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
                                <JobPostingCard key={job._id} job={job} isServiceProvider={false} />
                            ) : (
                                user.city.toLowerCase() === job.city.toLowerCase() && (
                                    <JobPostingCard key={job._id} job={job} isServiceProvider={true} />
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