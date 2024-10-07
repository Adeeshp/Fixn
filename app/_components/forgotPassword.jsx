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
      <main className="flex flex-col items-center justify-center w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl w-1/3 max-w-4xl m-5">
          <div className="p-5 m-2">
            <h4 className="text-eerie_black font-bold">Forgot Password</h4>
            <form onSubmit={handleSubmit} className="flex flex-col items-center m-3">
              {/* Email input field */}
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400 m-2" />
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

              {/* Submit Button */}
              <Button type="submit" className="m-3" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Send Reset Link'}
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

  export default ForgotPassword;
