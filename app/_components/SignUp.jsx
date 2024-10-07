import React from 'react'

const SignUp = () => {
  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="lg:w-1/3 md:w-2/5 w-full bg-white rounded-lg shadow-lg p-6">
    <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">Sign Up</h1>
    <form action="#" method="POST">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-600 text-sm font-medium mb-1">First Name</label>
        <input type="text" id="firstName" name="firstName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-600 text-sm font-medium mb-1">Last Name</label>
        <input type="text" id="lastName" name="lastName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">Email Address</label>
        <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-600 text-sm font-medium mb-1">Phone Number</label>
        <div className="flex">
          <select className="border border-gray-300 rounded-md py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-primary" required>
            <option value="+1" selected>+1</option>
          </select>
          <input type="text" id="phoneNumber" name="phoneNumber" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-1">Password</label>
        <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
      </div>

      <div className="mb-4">
        <label htmlFor="postalCode" className="block text-gray-600 text-sm font-medium mb-1">Postal Code</label>
        <input type="text" id="postalCode" name="postalCode" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 text-sm">
          <input type="checkbox" id="terms" name="terms" className="mr-2" required />
          I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and have reviewed the <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </label>
      </div>

      <button type="submit" className="bg-primary hover:bg-green-700 text-white font-semibold rounded-md py-2 px-3 w-full transition duration-200 ease-in-out">Create Account</button>
      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-primary hover:underline">Already have an account? Sign In</a>

      </div>
    </form>
  </div>
</div>


  )
}

export default SignUp;

