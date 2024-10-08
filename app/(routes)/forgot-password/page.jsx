"use client";
import { Button } from "@/components/ui/button";
import { FaRegEnvelope } from 'react-icons/fa';
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error and message states
        setError('');
        setMessage('');

        // Basic email format validation using regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsProcessing(true); // Start processing

        try {
            // Simulate sending request to API for password reset
            await fakeApiCall(email);
            setMessage('Password reset link has been sent to your email');
        } catch (err) {
            setError('Error sending password reset link');
        } finally {
            setIsProcessing(false); // End processing
        }
    };

    const fakeApiCall = (email) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful response after 2 seconds
                resolve(true);
            }, 2000);
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="lg:w-2/6 md:w-1/2 w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center m-3">
                    {/* Email input field */}
                    <div className="w-full flex items-center">
                        {/* <FaRegEnvelope width={20} className="text-gray-400 m-2 f-10" /> */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
                            
                        />
                    </div>
                    {/* Error Message */}
                    {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}

                    {/* Submit Button */}
                    <Button className="mt-6 bg-primary hover:bg-white hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Send Reset Link'}
                    </Button>

                    {/* Success Message */}
                    {message && <p className="mt-6 text-gray-400 text-sm">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
