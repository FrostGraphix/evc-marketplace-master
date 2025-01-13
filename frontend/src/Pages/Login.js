import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";
import "./LoginSignup.css"; // Shared styles for split-screen layout

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart, fetchUserLikedProduct } =
    useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails();
        fetchUserAddToCart();
        fetchUserLikedProduct();
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="split-screen">
      {/* Left Section */}
      <div
        className="left-section flex flex-col justify-center items-start pl-10 space-y-6"
        style={{
          backgroundColor: "#1B2430", // Background color from the uploaded image
          color: "white",
        }}
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold leading-tight">
            <span className="text-[#FF8C42]">Creating</span> Homes
          </h1>
          <h1 className="text-4xl font-bold leading-tight">
            Envisioning Prosperity
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Buy, Sell and List Properties with EVC
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section flex flex-col items-center justify-center py-10 px-6">
        <h2 className="text-2xl font-semibold mb-4">Sign in to your account</h2>
        <p className="mb-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-[#1B2430] hover:underline hover:text-[#FF8C42]"
          >
            Register
          </Link>
        </p>
        <form
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2430]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2430]"
              />
              <span
                className="absolute right-3 top-2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm text-[#1B2430] hover:underline hover:text-[#FF8C42] block mb-4"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="w-full bg-[#1B2430] text-white py-2 px-4 rounded-lg hover:bg-[#FF8C42] focus:outline-none focus:ring-2 focus:ring-[#FF8C42]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
