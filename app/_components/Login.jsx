"use client";
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error state
    setError('');

    // Validate input fields
    if (username.trim() === '') {
      setError('Username is required');
      return;
    }

    if (password.trim() === '') {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsProcessing(true); // Start processing

    // Simulate a login API call
    fakeApiCall(username, password)
      .then(() => {
        console.log('Login successful');
        // Handle successful login here
      })
      .catch((err) => {
        setError('Invalid username or password');
      })
      .finally(() => {
        setIsProcessing(false); // End processing
      });
  };

  const fakeApiCall = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful response after 2 seconds
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="lg:w-2/6 md:w-1/2 w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              autoComplete="off"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-6 text-left">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className={`bg-primary hover:bg-white  hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-primary hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
