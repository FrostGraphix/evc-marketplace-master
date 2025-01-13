import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import displayNARCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    estateFeatures: '',
    title: '',
    price: '',
    sellingPrice: '',
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState('');

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: params?.id }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data || {});
      setActiveImage(dataResponse?.data?.productImage?.[0] || '');
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    if (id) {
      await addToCart(e, id);
      fetchUserAddToCart();
    }
  };

  const handleBuyProduct = async (e, id) => {
    if (id) {
      await addToCart(e, id);
      fetchUserAddToCart();
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white via-[#f7f8fa] to-[#ebedf2] p-6 md:p-10 lg:p-24">
      <div className="container mx-auto p-4">
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-8">
          {/* Product Image and Thumbnails */}
          <div className="flex flex-col lg:w-[60%] gap-4 mb-8 lg:mb-0">
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded-lg relative p-2 overflow-hidden">
              {activeImage ? (
                <img
                  src={activeImage}
                  className="h-full w-full object-scale-down mix-blend-multiply"
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleLeaveImageZoom}
                  alt="Product"
                />
              ) : (
                <div className="h-full w-full bg-slate-300 animate-pulse"></div>
              )}

              {/* Product zoom */}
              {zoomImage && (
                <div className="hidden lg:block absolute overflow-hidden w-full h-full top-0 left-0">
                  <div
                    className="w-full h-full bg-no-repeat bg-contain"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                      transform: 'scale(2)',
                    }}
                  ></div>
                </div>
              )}
            </div>

            {/* Product Thumbnails */}
            <div className="h-full flex gap-2 overflow-scroll scrollbar-none">
              {loading ? (
                productImageListLoading.map((_, index) => (
                  <div
                    className="h-20 w-20 bg-orange-500 rounded animate-pulse"
                    key={`loadingImage${index}`}
                  ></div>
                ))
              ) : (
                data?.productImage?.map((imageURL) => (
                  <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imageURL}>
                    <img
                      src={imageURL}
                      className="w-full p-1 h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                      onClick={() => handleMouseEnterProduct(imageURL)}
                      alt="Thumbnail"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Product Details */}
          {loading ? (
            <div className="grid w-full gap-1">
              {/* Skeleton loaders */}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="bg-[#232936] text-white px-6 py-2 rounded-full inline-block w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-4xl lg:text-4xl font-bold">{data?.productName}</h2>

              <div className="text-[#FF6700] flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2">
                <p className="text-[#232936]">{displayNARCurrency(data.sellingPrice)}</p>
              </div>

              <div className="flex items-center my-2 gap-3">
                <button
                  className="border-2 text-[#FF6700] font-medium px-3 py-1 min-w-[120px] border-[#FF6700] hover:bg-[#FF6700] hover:text-white"
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy
                </button>
                <button
                  className="border-2 font-medium text-white bg-[#FF6700] px-3 py-1 min-w-[120px] border-[#FF6700] hover:text-[#FF6700] hover:bg-white"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>

              <div>
                <p className="text-[#232936] font-bold mt-4 mb-1">Property Details:</p>
                <p>{data.description}</p>

                <p className="text-[#232936] font-bold my-1">Estate Features:</p>
                <p>{data.estateFeatures}</p>

                <p className="text-[#232936] font-bold mt-4 mb-1">Property Title:</p>
                <p>{data.title}</p>
              </div>
            </div>
          )}
        </div>

        {data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading="Recommended Products" />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;