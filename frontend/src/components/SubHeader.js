import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

const SubHeader = () => {
  return (
    <div className='bg-yellow-600 h-full mb-2 hidden lg:block'>
      <div className='container mx-auto flex items-center'>
        <div className='flex items-center text-white gap-3 font-semibold text-1xl'>

          {/* Category Dropdown */}
          <div className='relative group'>
            <div className='flex items-center px-6 py-3 font-bold hover:bg-white hover:text-black gap-3 cursor-pointer'>
              <RxHamburgerMenu /> Category
            </div>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black shadow-lg  z-20 w-64">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Smartphones</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Laptops</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Cameras</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Gaming Consoles</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Home Appliances</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Smart Watches</li>
              </ul>
            </div>
          </div>

          {/* Mobile and Accessories Dropdown */}
          <div className='relative group  min-w-56'>
            <div className='flex items-center  px-6 py-3 hover:bg-white hover:text-black cursor-pointer'>
              Mobile and Accessories
            </div>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black shadow-lg  z-20 w-64">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Smartphones</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Phone Cases</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Chargers & Cables</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Power Banks</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Screen Protectors</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Bluetooth Headsets</li>
              </ul>
            </div>
          </div>

          {/* Earpods Dropdown */}
          <div className='relative group'>
            <div className='flex items-center px-6 py-3 hover:bg-white hover:text-black cursor-pointer'>
              Earpods
            </div>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black shadow-lg z-20 w-64">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Apple AirPods</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Samsung Galaxy Buds</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Noise Cancelling Earbuds</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Budget Earbuds</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Wireless Earbuds</li>
              </ul>
            </div>
          </div>

          {/* Computer and Gadgets Dropdown */}
          <div className='relative group  min-w-56'>
            <div className='flex items-center px-6 py-3 hover:bg-white hover:text-black cursor-pointer'>
              Computer and Gadgets
            </div>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black shadow-lg z-20 w-64">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Laptops</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Gaming Laptops</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Monitors</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Keyboards & Mice</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Printers</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">External Storage</li>
              </ul>
            </div>
          </div>

          {/* Camera Dropdown */}
          <div className='relative group'>
            <div className='flex items-center px-6 py-3 hover:bg-white hover:text-black cursor-pointer'>
              Camera
            </div>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black shadow-lg z-20 w-64">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">DSLR Cameras</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Mirrorless Cameras</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Action Cameras</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Camera Lenses</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Tripods & Mounts</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Camera Accessories</li>
              </ul>
            </div>
          </div>

          {/* Mouse and Keyboard Dropdown */}
          <div className='relative group  min-w-56'>
            <div className='flex items-center px-6 py-3 hover:bg-white hover:text-black cursor-pointer'>
              Mouse and Keyboard
            </div>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black shadow-lg z-20 w-64">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Gaming Keyboards</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Mechanical Keyboards</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Wireless Keyboards</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Wireless Mice</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Ergonomic Mice</li>
              </ul>
            </div>
          </div>

          {/* Bluetooth and Speaker Dropdown */}
          <div className='relative group  min-w-56'>
            <div className='flex items-center px-6 py-3 hover:bg-white hover:text-black cursor-pointer'>
              Bluetooth and Speaker
            </div>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black shadow-lg  z-20 w-64">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Portable Bluetooth Speakers</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Soundbars</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Smart Home Speakers</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Wireless Earphones</li>
                <li className="px-4 py-2 hover:bg-yellow-100 cursor-pointer">Home Theater Systems</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubHeader;
