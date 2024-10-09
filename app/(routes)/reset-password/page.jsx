"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [token, setToken] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Get token from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Invalid or missing token');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and message states
    setError('');
    setMessage('');

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
      const response = await fetch('/api/user/reset_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'Error resetting password');
      }
    } catch (err) {
      setError('Error resetting password');
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="lg:w-2/6 md:w-1/2 w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Reset Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center m-3">
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
          <Button className="hover:bg-white hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer mb-2" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Reset Password'}
          </Button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {message && <p className="text-secondary text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
