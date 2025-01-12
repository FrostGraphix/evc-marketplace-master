import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayNARCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { PaystackButton } from 'react-paystack';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: newQuantity
      })
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = data.reduce((acc, item) => acc + (item.quantity * item.productId.sellingPrice), 0);

  const email = context.user?.email || "customer@example.com"; // Customer's email
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const handleSuccess = (reference) => {
    console.log("Payment successful:", reference);
    // Perform any post-payment actions, e.g., updating the backend or reloading the cart
  };

  const handleClose = () => {
    console.log("Payment closed");
  };

  const componentProps = {
    email,
    amount: totalPrice * 100, // Convert amount to kobo
    publicKey,
    text: "Checkout",
    onSuccess: handleSuccess,
    onClose: handleClose,
    metadata: {
      cartItems: data,
    },
  };

  return (
    <div className="container mx-auto mt-14 lg:mt-0 p-6 md:p-10 lg:p-24">
      {/* Page Header */}
      <div className="bg-[#232936] text-white rounded-t-lg shadow-md px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4 shadow-md rounded-b-lg">
        {/* Empty Cart Message */}
        {data.length === 0 && !loading && (
          <div className="bg-gray-50 rounded p-4 text-center text-gray-600 font-medium my-6">
            No items in your cart.
          </div>
        )}

        {/* Layout for Cart and Summary */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Cart Items */}
          <div className="w-full lg:w-3/4 bg-white p-4 rounded-lg">
            {loading ? (
              <>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={"loading" + idx}
                    className="w-full h-28 bg-gray-100 border border-gray-300 my-3 rounded animate-pulse"
                  ></div>
                ))}
              </>
            ) : (
              data.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 border-b border-gray-300 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg">
                      {product.productId.productImage[0] ? (
                        <img
                          src={product.productId.productImage[0]}
                          alt={product.productId.productName}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm italic">No image</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {product.productId.productName}
                      </h3>
                      <div className="flex items-center mt-2">
                        <button
                          className="bg-gray-200 text-gray-600 hover:bg-gray-300 rounded px-2 py-1 mr-2 transition-colors"
                          onClick={() => handleQuantityChange(product._id, Math.max(1, product.quantity - 1))}
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="font-medium text-gray-800">{product.quantity}</span>
                        <button
                          className="bg-gray-200 text-gray-600 hover:bg-gray-300 rounded px-2 py-1 ml-2 transition-colors"
                          onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCartProduct(product._id)}
                    className="text-[#FF6700] hover:bg-orange-600 hover:text-white p-2 rounded-full transition-colors"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Summary Section */}
          {data.length > 0 && !loading && (
            <div className="w-full lg:w-1/4 h-fit self-start">
              <div className="rounded-lg overflow-hidden shadow border border-gray-200">
                <h2 className="text-white bg-[#FF6700] px-4 py-2 font-bold text-lg">
                  Summary
                </h2>
                <div className="bg-orange-50 px-4 py-4 text-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Total items:</span>
                    <span className="font-semibold">{totalQty}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Total cost:</span>
                    <span className="font-semibold">
                      {displayNARCurrency(totalPrice)}
                    </span>
                  </div>
                  <PaystackButton {...componentProps} className="w-full bg-[#FF6700] hover:bg-orange-600 text-white py-2 rounded-lg transition-colors font-medium" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
