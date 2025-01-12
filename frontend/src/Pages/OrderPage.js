import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayNARCurrency from '../helpers/displayCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.order.url, {
      method: SummaryApi.order.method,
      credentials: 'include',
    });

    const responseData = await response.json();
    setData(responseData.data);
    console.log('order list', responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container mx-auto p-6 p-6 md:p-10 lg:p-24">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
      {!data[0] && (
        <div className="text-center text-gray-600 text-lg">
          <p>No Orders Available</p>
        </div>
      )}
      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={item.userId + index} className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4 text-gray-500 text-sm">
              <p className="font-semibold">{moment(item.createdAt).format('LL')}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="space-y-4">
                {item?.productDetails.map((product, index) => (
                  <div
                    key={product.productId + index}
                    className="flex items-center gap-4 bg-gray-50 rounded-lg p-4"
                  >
                    <img
                      src={product.image[0]}
                      className="w-24 h-24 object-contain bg-gray-100 rounded-md"
                      alt={product.name}
                    />
                    <div className='flex flex-col'>
                      <p className="font-medium text-lg w-64  text-gray-700 truncate text-ellipsis
                       max-w-xs">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-6 mt-2">
                        <p className="text-xl font-semibold text-yellow-600">
                          {displayNARCurrency(product.price)}
                        </p>
                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:min-w-[300px] flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Details</h3>
                  <p className="text-sm text-gray-600">
                    Method: {item.paymentDetails.payment_method_type[0]}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {item.paymentDetails.payment_status}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Details</h3>
                  {item.shipping_options.map((shipping, index) => (
                    <p key={shipping.shipping_rate} className="text-sm text-gray-600">
                      Shipping Amount: {shipping.shipping_amount}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <p className="text-lg font-bold text-gray-900">
                Total: {displayNARCurrency(item.totalAmount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
