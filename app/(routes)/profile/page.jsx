"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
 
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
 
                setUser(response.data.user);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "An error occurred");
                setLoading(false);
            }
        };
 
        fetchUserProfile();
    }, []);
 
    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
    }
 
    if (error) {
        return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
    }
 
    return (
<div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
<h1 className="text-2xl font-bold mb-4">User Profile</h1>
<div className="text-gray-700 mb-2">
<strong>First Name:</strong> {user.firstname || "N/A"}
</div>
<div className="text-gray-700 mb-2">
<strong>Last Name:</strong> {user.lastname || "N/A"}
</div>
<div className="text-gray-700 mb-2">
<strong>Email:</strong> {user.email || "N/A"}
</div>
<div className="text-gray-700 mb-2">
<strong>Phone Number:</strong> {user.phoneNo || "N/A"}
</div>
<div className="text-gray-700 mb-2">
<strong>City:</strong> {user.city || "N/A"}
</div>
<div className="text-gray-700 mb-2">
<strong>Province:</strong> {user.province || "N/A"}
</div>
<div className="text-gray-700 mb-2">
<strong>Country:</strong> {user.country || "N/A"}
</div>
</div>
    );
};
 
export default UserProfile;
