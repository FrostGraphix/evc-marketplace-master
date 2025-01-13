import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayNARCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { LiaCartPlusSolid } from 'react-icons/lia';
import { AiOutlineLike } from 'react-icons/ai';
import likedProduct from '../helpers/likedProduct';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const { fetchUserAddToCart, fetchUserLikedProduct } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleLikedProduct = async (e, id) => {
    await likedProduct(e, id);
    fetchUserLikedProduct();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 w-full relative">
      <h2 className="text-2xl sm:text-3xl font-bold py-4 text-center sm:text-left">{heading}</h2>

      <div className="relative">
        <button
          className="hidden sm:block bg-white shadow-lg rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gray-100 transition"
          onClick={scrollLeft}
        >
          <FaAngleLeft className="text-xl" />
        </button>
        <button
          className="hidden sm:block bg-white shadow-lg rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gray-100 transition"
          onClick={scrollRight}
        >
          <FaAngleRight className="text-xl" />
        </button>

        <div
          className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide snap-x snap-mandatory sm:ml-1 sm:mr-1"
          ref={scrollElement}
          style={{ scrollBehavior: 'smooth', overflow: 'auto' }}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="snap-start w-64 sm:w-80 h-72 bg-gray-200 rounded-lg shadow-md flex flex-col animate-pulse"
                >
                  <div className="h-64 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="mt-auto h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <Link
                  to={`/product/${product?._id}`}
                  key={product?._id}
                  className="snap-start w-64 sm:w-80 h-72 bg-white rounded-lg shadow-md flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
                  style={{ flex: '0 0 auto', minWidth: '16rem' }}
                >
                  <div className="h-44 bg-gray-100">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="font-medium text-lg truncate text-gray-800">
                      {product?.productName}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {displayNARCurrency(product?.sellingPrice)}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <button
                        className="text-orange-500 hover:bg-orange-500 hover:text-white transition-colors p-2 rounded-full"
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      >
                        <LiaCartPlusSolid className="text-xl" />
                      </button>
                      <button
                        className="text-orange-500 hover:bg-orange-500 hover:text-white transition-colors p-2 rounded-full"
                        onClick={(e) => handleLikedProduct(e, product?._id)}
                      >
                        <AiOutlineLike className="text-xl" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
