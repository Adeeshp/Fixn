"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and message states
    setError('');
    setMessage('');

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // New password validation
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsProcessing(true); // Start processing

    try {
      // Simulate sending request to API for password reset
      await fakeApiCall(email, newPassword);
      setMessage('Password has been successfully reset');
    } catch (err) {
      setError('Error resetting password');
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  const fakeApiCall = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful response after 2 seconds
        resolve(true);
      }, 2000);
    });
  };

  return (
    <main className="flex flex-col items-center justify-center w-full text-center">
      <div className="bg-white rounded-2xl shadow-2xl w-1/3 max-w-4xl m-5">
        <div className="p-5 m-2">
          <h4 className="text-eerie_black font-bold">Reset Password</h4>
          <form onSubmit={handleSubmit} className="flex flex-col items-center m-3">
            {/* Email input field */}
            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 outline-none text-sm flex-1"
                required
              />
            </div>

            {/* New Password input field */}
            <div className="bg-gray-100 w-64 p-2 mb-3">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-100 outline-none text-sm w-full"
                required
              />
            </div>

            {/* Confirm Password input field */}
            <div className="bg-gray-100 w-64 p-2 mb-3">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-100 outline-none text-sm w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="m-3" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Reset Password'}
            </Button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Success Message */}
            {message && <p className="text-secondary text-sm">{message}</p>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
