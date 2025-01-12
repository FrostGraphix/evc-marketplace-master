import React, { useState } from 'react';
import axios from 'axios';

const AdminUploadDocuments = () => {
  const [formData, setFormData] = useState({
    buyerName: '',
    email: '',
    propertyPrice: '',
    propertyLocation: '',
    propertyTitle: '',
    purchasedDate: '',
    documentLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/document/create', formData);
      if (res.data.success) {
        alert('Document uploaded successfully!');
        // Reset form
        setFormData({
          buyerName: '',
          email: '',
          propertyPrice: '',
          propertyLocation: '',
          propertyTitle: '',
          purchasedDate: '',
          documentLink: '',
        });
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading document');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8 transform transition-all duration-500 hover:scale-105">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Upload Client Property Documents
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Powered by EVC
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Buyer Name</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Buyer Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Property Price</label>
            <input
              type="number"
              name="propertyPrice"
              value={formData.propertyPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Property Location</label>
            <input
              type="text"
              name="propertyLocation"
              value={formData.propertyLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Property Title</label>
            <input
              type="text"
              name="propertyTitle"
              value={formData.propertyTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Purchased Date</label>
            <input
              type="date"
              name="purchasedDate"
              value={formData.purchasedDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Property Document Link</label>
            <input
              type="text"
              name="documentLink"
              value={formData.documentLink}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#232936] hover:bg-[#FF6700] text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUploadDocuments;
