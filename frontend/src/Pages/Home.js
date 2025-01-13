import React, { useState } from 'react';
import HorizontalCardProduct from '../components/HorizontalCardProduct';

function Home() {
  const [activeTab, setActiveTab] = useState('All');

  const renderContent = () => {
    if (activeTab === 'Buildings') {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <span className="text-gray-600 text-2xl font-bold">Coming Soon, Stay Tuned</span>
          <span className="text-5xl mt-4">🏗️</span>
        </div>
      );
    }
    return (
      <>
        <HorizontalCardProduct category={'airpodes'} heading={"Trending Properties"} />
        <HorizontalCardProduct category={'watches'} heading={'Afonja Boulevard'} />
        <HorizontalCardProduct category={'speakers'} heading={'Vision Smart City'} />
        <HorizontalCardProduct category={'mobiles'} heading={'Riyadh Golf'} />
      </>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-[#f7f8fa] to-[#ebedf2]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <div className="relative w-full h-80vh py-4 px-6 sm:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center justify-start space-y-6 md:space-y-8 transition-all duration-700 ease-out mt-24 md:mt-32">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#232936] transition-transform duration-500 transform hover:scale-105">
            Explore EVC's <span className="text-[#FF6700]">Marketplace</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover a world of quality products, trusted sellers, and exceptional deals. Whether you're looking to find a new treasure or list your own, we've made it easier for you to thrive in our community.
          </p>
          <a
            className="inline-block bg-[#232936] text-white font-semibold py-3 px-12 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300 hover:bg-[#FF6700]"
            href="/become-realtor"
          >
            List your Property now
          </a>
        </div>
      </div>

      {/* Subheading and Toggle Bar */}
      <div className="max-w-[1200px] mx-auto text-center py-8 px-6 sm:px-12 lg:px-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#232936] mb-4">Available Properties</h2>
        <div className="flex justify-center space-x-8 items-center border-b-2 border-gray-200 pb-4">
          {['All', 'Land', 'Buildings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 text-sm font-medium ${
                activeTab === tab ? 'text-[#FF6700]' : 'text-gray-500'
              } hover:text-[#FF6700] transition-colors duration-300`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6700] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Listings or Coming Soon */}
      <div className="px-6 sm:px-12 lg:px-24 flex flex-col items-center">{renderContent()}</div>
    </div>
  );
}

export default Home;
