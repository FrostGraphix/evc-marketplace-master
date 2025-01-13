import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function BecomeRealtor() {
  const [propertyData, setPropertyData] = useState({
    name: '',
    phoneNumber: '',
    propertySize: '',
    noOfPlots: '',
    propertyDescription: '',
    pricePerPlot: '',
    estateLocation: '',
    negotiable: false,
    distress: false,
    file: null, // File for upload
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const main = document.getElementById('main-content');
    if (main) {
      main.classList.remove('opacity-0', 'translate-y-5');
      main.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'file') {
      setPropertyData((prev) => ({
        ...prev,
        [name]: e.target.files[0], // Store file locally
      }));
    } else {
      setPropertyData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mern_product'); // Use the provided preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dhdloaqcp/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the uploaded file's URL
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      toast.error('File upload failed. Please try again.', { autoClose: 3000 });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      phoneNumber,
      propertySize,
      noOfPlots,
      propertyDescription,
      pricePerPlot,
      estateLocation,
      file,
    } = propertyData;

    if (
      !name ||
      !phoneNumber ||
      !propertySize ||
      !noOfPlots ||
      !propertyDescription ||
      !pricePerPlot ||
      !estateLocation
    ) {
      toast.error('Please fill all fields.', {
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      let fileUrl = '';
      if (file) {
        fileUrl = await uploadToCloudinary(file); // Upload file and get URL
        if (!fileUrl) {
          setLoading(false);
          return; // Stop if file upload failed
        }
      }

      const response = await fetch('https://formspree.io/f/xdkorjln', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phoneNumber,
          propertySize,
          noOfPlots,
          propertyDescription,
          pricePerPlot,
          estateLocation,
          fileUrl, // Include file URL in Formspree submission
        }),
      });

      if (response.ok) {
        toast.success('Your property has been listed successfully!', {
          autoClose: 3000,
        });
        setPropertyData({
          name: '',
          phoneNumber: '',
          propertySize: '',
          noOfPlots: '',
          propertyDescription: '',
          pricePerPlot: '',
          estateLocation: '',
          negotiable: false,
          distress: false,
          file: null,
        });
      } else {
        toast.error('Failed to submit the form. Please try again.', {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.', {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <div className="w-full h-screen bg-[#141d2c] flex flex-col justify-center items-center px-8 md:px-24 text-center">
        <div
          className="max-w-2xl space-y-4 opacity-0 translate-y-5 transition duration-700 ease-out"
          id="main-content"
        >
          <div className="text-5xl" role="img" aria-label="cart">
            🛒
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            List your property with EVC
          </h1>
          <p className="text-gray-300 md:text-lg px-4">
            With EVC, you can now showcase your property to a broader audience. Fill in the
            details below and let your buyers find you effortlessly.
          </p>
          <Link
            to="/"
            className="inline-block bg-white hover:bg-[#FF6700] text-[#232936] hover:text-white font-semibold py-3 px-8 rounded-full shadow-md transform hover:scale-105 transition-transform"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative bg-gradient-to-br from-white via-[#f7f8fa] to-[#ebedf2] -mt-20 mx-auto rounded-lg shadow-lg p-6 sm:p-10 max-w-lg sm:max-w-4xl w-full">
        <h2 className="text-3xl font-extrabold text-[#232936] text-center mb-6">List your property</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={propertyData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={propertyData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Property size</label>
              <select
                name="propertySize"
                value={propertyData.propertySize}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select option</option>
                <option value="150-SQM">150 SQM</option>
                <option value="300-SQM">300 SQM</option>
                <option value="450-SQM">450 SQM</option>
                <option value="500-SQM">500 SQM</option>
                <option value="600-SQM">600 SQM</option>
                <option value="650-SQM">650 SQM</option>
                <option value="1-ACRE">1 ACRE</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">No of Plots</label>
              <input
                type="number"
                name="noOfPlots"
                value={propertyData.noOfPlots}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter number of plots"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Property Description</label>
            <textarea
              name="propertyDescription"
              value={propertyData.propertyDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Write a short description"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Price per plot</label>
              <input
                type="text"
                name="pricePerPlot"
                value={propertyData.pricePerPlot}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter price per plot"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Estate property is located in
              </label>
              <input
                type="text"
                name="estateLocation"
                value={propertyData.estateLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g. The Pearl Residence, Iko, Backend"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Upload a File</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="negotiable"
                checked={propertyData.negotiable}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-700 text-sm">This price is negotiable</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="distress"
                checked={propertyData.distress}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-700 text-sm">This is a distress sale</label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-8 rounded-full font-semibold ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#232936] hover:bg-[#FF6700]'
            } text-white transition-colors`}
          >
            {loading ? 'Submitting...' : 'List property'}
          </button>
        </form>
      </div>
      <div className="mb-8"></div>
    </div>
  );
}

export default BecomeRealtor;
