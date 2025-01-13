import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import logo from "../assest/EVC.png";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);

  const portfolioTimeoutRef = useRef(null);

  const excludedRoutes = ["/sign-up", "/login"];

  // Determine if user is Admin
  const isAdmin = user?.role === ROLE.ADMIN;

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu") && menuDisplay) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuDisplay]);

  const handlePortfolioMouseEnter = () => {
    if (portfolioTimeoutRef.current) {
      clearTimeout(portfolioTimeoutRef.current);
    }
    setPortfolioOpen(true);
  };

  const handlePortfolioMouseLeave = () => {
    portfolioTimeoutRef.current = setTimeout(() => {
      setPortfolioOpen(false);
    }, 1500);
  };

  const handlePortfolioToggle = () => {
    setPortfolioOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleMobilePortfolio = () => {
    setMobilePortfolioOpen((prev) => !prev);
  };

  if (excludedRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="bg-[#F9F8F6] bg-opacity-80 backdrop-blur-xl text-black sticky top-0 w-full z-50 border-b border-gray-200">
      {/* Desktop Header */}
      <div className="max-w-[1300px] mx-auto py-6 px-4 lg:px-24 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src={logo} alt="EVC Logo" className="h-11 w-auto" />
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-8 text-base font-medium text-[#232936]">
          {/* Portfolio with Dropdown */}
          <div
            className="relative"
            onMouseEnter={handlePortfolioMouseEnter}
            onMouseLeave={handlePortfolioMouseLeave}
          >
            <button
              className="flex items-center gap-1 hover:text-[#FF6700] transition-colors"
              onClick={handlePortfolioToggle}
            >
              Portfolio <span className="text-xs">&#9662;</span>
            </button>
            {portfolioOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg py-2 w-48 transition-opacity duration-1500">
                <div className="px-4 py-1 text-xs font-bold text-left text-[#FF6700] uppercase tracking-wider">
                  Portfolio
                </div>
                <a
                  href="https://evcng.com/buy-land"
                  className="block px-4 py-2 text-base text-left hover:bg-gray-100"
                >
                  Buy Land
                </a>
                <a
                  href="https://evcng.com/build-projects"
                  className="block px-4 py-2 text-base text-left hover:bg-gray-100"
                >
                  Build Projects
                </a>
                <a
                  href="https://evcng.com/investment"
                  className="block px-4 py-2 text-base text-left hover:bg-gray-100"
                >
                  Investment
                </a>
              </div>
            )}
          </div>

          <a
            href="https://evcng.com/why-us"
            className="hover:text-[#FF6700] transition-colors"
          >
            Why Us
          </a>

          {/* Marketplace Link */}
          <a href="/" className="hover:text-[#FF6700] transition-colors">
            Marketplace
          </a>

          <a
            href="https://evcng.com/evc-blog"
            className="hover:text-[#FF6700] transition-colors"
          >
            Blog
          </a>

          <a
            href="https://evcng.com/book-inspection"
            className="hover:text-[#FF6700] transition-colors font-medium"
          >
            Book Inspection
          </a>

          {/* Become a Realtor (in EVC orange) */}
          <Link
            to="/become-realtor"
            className="text-[#FF6700] transition-colors font-medium hover:opacity-90"
          >
            Become a Realtor
          </Link>
        </nav>

        {/* User and Cart Section (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          {user?._id ? (
            <>
              {/* Liked Products */}
              <Link
                to="/likedpage"
                className="relative text-[#232936] hover:text-[#FF6700] transition-colors"
              >
                <AiOutlineLike className="text-xl" />
                {context?.likedProductCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#FF6700] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {context?.likedProductCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-[#232936] hover:text-[#FF6700] transition-colors"
              >
                <BsCart2 className="text-xl" />
                {context?.cartProductCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#FF6700] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {context?.cartProductCount}
                  </span>
                )}
              </Link>

              {/* Profile Menu */}
              <div
                className="relative cursor-pointer flex items-center user-menu"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border-2 border-[#FF6700]"
                  />
                ) : (
                  <FaRegCircleUser className="text-xl text-[#232936]" />
                )}

                {menuDisplay && (
                  <div className="absolute right-0 top-full mt-2 bg-white text-black p-2 rounded-md w-40 border border-gray-100">
                    {/* Admin Panel link from Snippet #2 (visible if admin) */}
                    {isAdmin && (
                      <Link
                        to="/admin-panel"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Admin Panel
                      </Link>
                    )}

                    {/* Document logic from Snippet #1 */}
                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin/my-documents"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          My Documents
                        </Link>
                        <Link
                          to="/admin/upload-document"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Upload Document
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/my-documents"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Documents
                      </Link>
                    )}

                    {/* Orders & Logout (from Snippet #2) */}
                    <Link
                      to="/order"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-block bg-[#FF6700] text-white py-3 px-12 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Liked Products */}
          <Link to="/likedpage" className="relative">
            <AiOutlineLike className="text-xl text-[#232936]" />
            {context?.likedProductCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#FF6700] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {context?.likedProductCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <BsCart2 className="text-xl text-[#232936]" />
            {context?.cartProductCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#FF6700] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {context?.cartProductCount}
              </span>
            )}
          </Link>

          {/* Profile Icon (Mobile) */}
          <div
            className="relative cursor-pointer user-menu"
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-8 h-8 rounded-full border-2 border-[#FF6700]"
              />
            ) : (
              <FaRegCircleUser className="text-xl text-[#232936]" />
            )}

            {menuDisplay && (
              <div className="absolute right-0 top-full mt-2 bg-white text-black p-2 rounded-md w-40 border border-gray-100">
                {/* Admin Panel on mobile if admin */}
                {isAdmin && (
                  <Link
                    to="/admin-panel"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Admin Panel
                  </Link>
                )}

                {/* Snippet #1 doc logic (mobile) */}
                {isAdmin ? (
                  <>
                    <Link
                      to="/admin/my-documents"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Documents
                    </Link>
                    <Link
                      to="/admin/upload-document"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Upload Document
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/my-documents"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Documents
                  </Link>
                )}

                {/* Orders & Logout (mobile) */}
                <Link
                  to="/order"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Menu Toggle */}
          <button onClick={toggleMobileMenu} className="text-xl text-[#232936]">
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-0 left-0 w-full h-screen bg-white z-0 flex flex-col items-center text-center overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-3xl text-[#232936] mt-6"
          >
            ✖
          </button>

          {/* Logo */}
          <a href="/" className="my-6">
            <img src={logo} alt="EVC Logo" className="h-12 w-auto" />
          </a>

          {/* Navigation Links (Mobile) */}
          <nav className="w-full">
            <button
              onClick={toggleMobilePortfolio}
              className="block w-full text-left px-8 py-4 text-base text-[#232936] font-medium hover:bg-gray-100"
            >
              Portfolio {mobilePortfolioOpen ? "▲" : "▼"}
            </button>
            {mobilePortfolioOpen && (
              <div className="w-full bg-gray-50">
                <a
                  href="https://evcng.com"
                  className="block px-12 py-3 text-left text-base text-[#232936] hover:bg-gray-200"
                >
                  Buy Land
                </a>
                <a
                  href="https://evcng.com/build-projects"
                  className="block px-12 py-3 text-left text-base text-[#232936] hover:bg-gray-200"
                >
                  Build Projects
                </a>
                <a
                  href="https://evcng.com/investment"
                  className="block px-12 py-3 text-left text-base text-[#232936] hover:bg-gray-200"
                >
                  Investment
                </a>
              </div>
            )}

            <a
              href="https://evcng.com/why-us"
              className="block w-full text-left px-8 py-4 text-base text-[#232936] hover:bg-gray-100"
            >
              Why Us
            </a>
            <a
              href="/"
              className="block w-full text-left px-8 py-4 text-base text-[#232936] hover:bg-gray-100"
            >
              Marketplace
            </a>
            <a
              href="https://evcng.com/evc-blog"
              className="block w-full text-left px-8 py-4 text-base text-[#232936] hover:bg-gray-100"
            >
              Blog
            </a>
            <a
              href="https://evcng.com/book-inspection"
              className="block w-full text-left px-8 py-4 text-base text-[#232936] hover:bg-gray-100"
            >
              Book Inspection
            </a>
            <Link
              to="/become-realtor"
              className="block w-full text-left px-8 py-4 text-base text-[#FF6700] font-medium hover:bg-gray-100"
            >
              Become a Realtor
            </Link>
          </nav>

          {/* Logout / Login (Mobile) */}
          {user?._id ? (
            <button
              onClick={handleLogout}
              className="mt-6 mb-6 bg-[#FF6700] text-white px-12 py-3 rounded-full text-sm font-medium hover:bg-opacity-90"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mt-6 mb-6 bg-[#FF6700] text-white px-12 py-3 rounded-full text-sm font-medium hover:bg-opacity-90"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
