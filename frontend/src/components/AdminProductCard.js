import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayNGNCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    return (
        <div className='bg-white p-4 rounded '>
            <div className='w-40 '>
              
                <div className='w-32 h-32 flex justify-center items-center ' >
                      <img src={data?.productImage[0]} width={120} height={120} 
                className='object-fill mx-auto h-full'/>
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {
                        displayNGNCurrency(data.sellingPrice)
                        } {/* Display formatted currency */}
                    </p> 

                    {/* Edit button to open the modal */}
                    <div className='w-fit ml-auto p-2 cursor-pointer bg-red-100 hover:text-white hover:bg-[#FF6700] rounded-full'
                        onClick={() => setEditProduct(true)}>  {/* Trigger opening the modal */}
                        <MdModeEditOutline/>
                    </div>
                </div>
            </div>

            {/* Display the edit product modal */}
            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)}  // Use the correct prop name
                    fetchdata={fetchdata}
                />
            )}
        </div>
    )
}

export default AdminProductCard;



/*import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayNGNCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded '>
         <div className='w-40 '>
         <img src={data?.productImage[0]} width={120} height={120} 
         className='w-fit mx-auto'/>
            <h1>{data?.productName}</h1>

            <div>

                   <div>
                    {
                        displayNGNCurrency(data.sellingPrice)
                    }
                    {data.sellingPrice}
                </div> 

                     {/* Edit button to open the modal *}
                    <div className='w-fit ml-auto p-2 cursor-pointer bg-red-100 hover:text-white
                         hover:bg-red-600 rounded-full'
                        onClick={() => setEditProduct(true)}>  {/* Trigger opening the modal *}
                        <MdModeEditOutline/>
                    </div>
            </div>

         
         </div>

            {/* Display the edit product modal *}
            {
                editProduct && (
                    <AdminEditProduct 
                        productData={data} 
                        onClose={() => setEditProduct(false)}  // Use the correct prop name
                        fetchdata={fetchdata}
                        />
                )
            }
        </div>
    )
}

export default AdminProductCard;*/




/*import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({
    data
}) => {
    const [editProduct, setEditProduct] = useState(false)


  return (
    <div className='bg-white p-4 rounded'>
            <img src={data?.productImage[0]} width={120} height={120}/>
            <h1>{data?.productName}</h1>

            <div className='w-fit ml-auto p-2 cursor-pointer bg-red-100 hover:text-white
             hover:bg-red-600 rounded-full'>
                <MdModeEditOutline/>
            </div>
            {
                editProduct && (
                      <AdminEditProduct productData={data} 
                      onClose={()=>setEditProduct(false)}/>
                )
            }

          
  </div>
  )
}

export default AdminProductCard*/