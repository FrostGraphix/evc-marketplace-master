import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assest/EVC Logo White.png"; // Ensure correct logo path

const Footer = () => {
  const location = useLocation();

  // Exclude the footer from specific pages
  const excludePaths = ["/login", "/sign-up"];
  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-[#1B2430] text-white py-10 mt-16 px-6 md:px-10 lg:px-32" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="space-y-4">
          <a href="https://evcng.com" className="flex items-center" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="EVC Logo" className="w-40 h-auto" />
          </a>
          <p className="text-gray-400 text-sm leading-relaxed">
            We specialize in innovative building constructions, helping bring visionary designs to life with quality and trust.
          </p>
        </div>

        {/* Portfolio Section */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4 text-orange-500">Portfolio</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="https://evcng.com/buy-land" className="hover:text-gray-200">Buy Land</a></li>
            <li><a href="https://evcng.com/build-projects" className="hover:text-gray-200">Build Projects</a></li>
            <li><a href="https://evcng.com/investment" className="hover:text-gray-200">Investment</a></li>
          </ul>
        </div>

        {/* EVC Section */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4 text-orange-500">EVC</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="https://evcng.com/why-us" className="hover:text-gray-200">Why Us</a></li>
            <li><a href="#" className="hover:text-gray-200">Exchange</a></li>
            <li><a href="https://evcng.com/evc-blog" className="hover:text-gray-200">Blog</a></li>
            <li><a href="https://evcng.com/book-inspection" className="hover:text-gray-200">Book Inspection</a></li>
            <li><Link to="/become-seller" className="hover:text-gray-200">Become a Seller</Link></li>
          </ul>
        </div>

        {/* Get In Touch Section */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4 text-orange-500">Get in Touch</h4>
          <div className="text-gray-400 text-sm leading-relaxed">
            <h5 className="font-bold text-white">ILORIN OFFICE</h5>
            <p>
              Suite C1, Kajo Mall,<br />
              Opp. Fresh Hotel, Fate,<br />
              Ilorin, Kwara State.
            </p>
          </div>
          <div className="text-gray-400 text-sm leading-relaxed">
            <h5 className="font-bold text-white">IBADAN OFFICE</h5>
            <p>
              Plot 11, Oluyoro Avenue,<br />
              Off Awolowo Rd, Bodija,<br />
              Ibadan, Oyo State.
            </p>
          </div>
        </div>
      </div>

      {/* Contact and Schedule Call Section */}
      <div className="max-w-[1300px] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <a href="mailto:contact@evcng.com" className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-[#232936] transition duration-150 ease-in-out">
          <p className="text-lg font-bold">Email</p>
          <p className="text-sm">contact@evcng.com</p>
        </a>
        <a href="tel:+2348064924874" className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-[#232936] transition duration-150 ease-in-out">
          <p className="text-lg font-bold">Schedule Call</p>
          <p className="text-sm">Available Mon – Fri</p>
        </a>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-gray-400 text-sm">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} EVCng. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;