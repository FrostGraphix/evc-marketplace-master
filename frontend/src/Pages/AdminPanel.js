import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  // Redirect non-admin users to the home page
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleEditProfile = () => {
    // Handle edit profile functionality
    alert("Edit profile functionality coming soon!");
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white min-h-full w-full md:max-w-[250px] shadow-lg border-r border-gray-200">
        {/* Admin Profile */}
        <div className="h-40 flex flex-col justify-center items-center bg-[#232936] text-white rounded-b-lg relative">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-white rounded-full overflow-hidden flex items-center justify-center bg-white">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-full h-full object-cover"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser className="text-5xl text-gray-400" />
              )}
            </div>
            <button
              onClick={handleEditProfile}
              className="absolute bottom-2 right-0 bg-[#FF6700]  text-white p-1 rounded-full shadow-lg hover:bg-[#FF6700] transition duration-300"
              title="Edit Profile"
            >
              <MdEdit size={20} />
            </button>
          </div>
          <p className="capitalize text-lg font-semibold mt-2">{user?.name}</p>
          <p className="text-sm opacity-90">{user?.role}</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 p-4">
          <Link
            to="all-users"
            className="block px-4 py-2 mb-2 rounded-lg bg-[#232936] hover:bg-[#FF6700] text-white font-medium transition duration-300"
          >
            Manage Users
          </Link>
          <Link
            to="all-products"
            className="block px-4 py-2 mb-2 rounded-lg bg-[#232936] hover:bg-[#FF6700] text-white  font-medium transition duration-300"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/upload-document"
            className="block px-4 py-2 mb-2 rounded-lg bg-[#232936] hover:bg-[#FF6700] text-white font-medium transition duration-300"
          >
            Upload Documents
          </Link>
          <Link
            to="/admin/my-documents"
            className="block px-4 py-2 mb-2 rounded-lg bg-[#232936] hover:bg-[#FF6700] text-white font-medium transition duration-300"
          >
            My Documents
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 mt-4 rounded-lg bg-gray-100 hover:bg-[#FF6700] text-gray-600 hover:text-white font-medium transition duration-300"
          >
            Go Back to Marketplace
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 shadow-lg rounded-lg m-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Welcome to the Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, products, and the platform to ensure a smooth experience from EVC dashboard.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-sm p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;