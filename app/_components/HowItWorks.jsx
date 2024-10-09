import React from 'react';
import { FaUserCheck, FaCalendarAlt, FaCommentsDollar } from 'react-icons/fa'; // Icons from react-icons

const HowItWorks = () => {
  return (
    <section className="my-10 bg-blue-50 p-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <FaUserCheck className="text-4xl text-secondary mb-4 transform transition-transform duration-300 hover:scale-125" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Choose Your Tasker</h3>
            <p className="text-gray-600 text-center">
              Select a Tasker based on price, skills, and reviews to get the right fit for your task.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <FaCalendarAlt className="text-4xl text-secondary mb-4 transform transition-transform duration-300 hover:scale-125" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Schedule Your Task</h3>
            <p className="text-gray-600 text-center">
              Book your Tasker for today or any day that fits your schedule, with the flexibility you need.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <FaCommentsDollar className="text-4xl text-secondary mb-4 transform transition-transform duration-300 hover:scale-125" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Complete & Pay</h3>
            <p className="text-gray-600 text-center">
              Chat with your Tasker, finalize the task, and pay all through the platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
