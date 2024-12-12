'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/contexts/UserContext';
import Link from 'next/link';
import {AiFillEye , AiFillEyeInvisible} from 'react-icons/ai';

const Login = () => {
  const { setUser } = useContext(UserContext);  // Access setUser from UserContext
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setError('');

    // Validate input fields
    if (username.trim() === '') {
      setError('Username is required');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
      setError('Please enter a valid email address');
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

    setIsProcessing(true); 

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data

        // Update the UserContext state
        setUser(data.user);  // This will trigger a re-render and display user data immediately

        router.push('/');  // Redirect to home
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Server error. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="lg:w-2/6 md:w-1/2 w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              autoComplete="off"
            />
          </div>

          {/* Password input field with show/hide functionality */}
          <div className="relative mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute right-3 py-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-gray-500 text-xl" />
              ) : (
                <AiFillEye className="text-gray-500 text-xl" />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mb-6 text-left">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`bg-primary hover:bg-white hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/register" className="text-sm text-primary hover:underline">
            New Here? <b>Sign up</b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
