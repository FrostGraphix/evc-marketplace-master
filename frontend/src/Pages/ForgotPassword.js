import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-white via-[#f7f8fa] to-[#ebedf2] p-6">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#232936] focus:border-[#232936] sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-[#232936] text-white font-semibold rounded-lg shadow-md hover:bg-[#FF6700] focus:outline-none focus:ring-2 focus:ring-[#232936] focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="mt-6 text-center text-sm text-gray-600">
            {message}
          </p>
        )}
        <div className="mt-6 flex justify-between">
          <Link to="/login" className="text-sm text-[#232936] hover:text-[#FF6700]">
            Back to Login
          </Link>
          <Link to="/sign-up" className="text-sm text-[#232936] hover:text-[#FF6700]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;