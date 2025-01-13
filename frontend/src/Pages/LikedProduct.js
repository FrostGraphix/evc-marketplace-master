import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayNARCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify"; // Import toast for notifications

const LikedProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context); 
  const loadingProducts = new Array(context.likedProductCount).fill(null);

  const fetchLikedProducts = async () => {
    try {
      const response = await fetch(SummaryApi.viewLikedProduct.url, {
        method: SummaryApi.viewLikedProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching liked products:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLikedProducts().finally(() => setLoading(false));
  }, []);

  // Modified delete function
  const deleteLikedProduct = async (id) => {
    try {
      const response = await fetch("/api/liked-product/delete", {
        method: "DELETE", // Ensure DELETE method
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ productId: id }), // Changed to productId
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Product removed successfully!"); // Success notification
        fetchLikedProducts(); // Refresh liked products list
        context.fetchUserLikedProduct(); // Update the global context
      } else {
        toast.error(responseData.message || "Failed to delete product."); // Error notification
      }
    } catch (error) {
      console.error('Error deleting liked product:', error);
      toast.error("An error occurred. Please try again."); // Fallback error notification
    }
  };

  return (
    <div className="container mx-auto mt-14 lg:mt-0 p-6 md:p-10 lg:p-24">
      {/* Page Header */}
      <div className="bg-[#232936] text-white rounded-t-lg shadow-md px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Liked Products</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4 shadow-md rounded-b-lg">
        {/* No Liked Products Message */}
        {data.length === 0 && !loading && (
          <div className="bg-gray-100 rounded p-4 text-center text-gray-600 font-medium my-4">
            No liked products
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 lg:items-start lg:justify-between">
          {/* Liked Products List */}
          <div className="w-full max-w-3xl">
            {loading ? (
              loadingProducts.map((_, index) => (
                <div
                  key={"LikedProductLoading" + index}
                  className="w-full h-32 bg-gray-200 border border-gray-300 my-3 rounded animate-pulse"
                ></div>
              ))
            ) : (
              data.map((product) => (
                <div
                  key={product?._id + "LikedProduct"}
                  className="w-full bg-white h-32 border border-gray-300 my-3 rounded grid grid-cols-[128px,1fr] overflow-hidden"
                >
                  <div className="w-32 h-32 bg-gray-100 flex items-center justify-center">
                    {product?.productId?.productImage[0] ? (
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-contain"
                        alt={product?.productId?.productName}
                      />
                    ) : (
                      <span className="text-gray-400 text-sm italic">No image</span>
                    )}
                  </div>
                  <div className="relative px-4 py-2 flex flex-col justify-center">
                    {/* Delete liked product */}
                    <div
                      className="absolute right-2 top-2 text-[#FF6700] rounded-full p-2 hover:bg-[#FF6700] hover:text-white cursor-pointer transition-colors"
                      onClick={() => deleteLikedProduct(product?.productId?._id)} // Ensure correct ID passed
                    >
                      <MdDelete size={20} />
                    </div>
                    <h2 className="text-lg lg:text-xl font-semibold line-clamp-1 text-gray-800">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-gray-800 font-medium text-lg">
                      {displayNARCurrency(product?.productId?.sellingPrice)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Section */}
          {data.length > 0 && (
            <div className="mt-4 lg:mt-0 w-full max-w-sm h-fit self-start">
              {loading ? (
                <div className="h-36 bg-gray-200 border border-gray-300 rounded animate-pulse"></div>
              ) : (
                <div className="rounded overflow-hidden shadow border border-gray-200">
                  <h2 className="text-white bg-[#FF6700] px-4 py-2 font-bold text-lg">
                    Property Summary
                  </h2>
                  <div className="bg-[#232936] px-4 py-4 flex items-center justify-between text-white font-medium text-lg">
                    <p>Total Products Liked</p>
                    <p>{data.length}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedProducts;
