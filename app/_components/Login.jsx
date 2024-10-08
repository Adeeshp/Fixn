import React from 'react';


const Login = () => {
  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
    <div className="lg:w-2/6 md:w-1/2 w-full bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h1>
      <form action="#" method="POST">
        <div className="mb-5">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
          <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out" autoComplete="off" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out" autoComplete="off" required />
        </div>
        <div className="mb-6 text-left">
          <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
        </div>
        <button type="submit" className="bg-primary hover:bg-green-700 text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out">Login</button>
      </form>
      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-primary hover:underline">Sign up Here</a>
      </div>
    </div>
  </div>
  );
};

export default Login;
