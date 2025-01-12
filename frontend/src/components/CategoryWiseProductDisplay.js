import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayNARCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'
import likedProduct from '../helpers/likedProduct'
import { LiaCartPlusSolid } from 'react-icons/lia'
import { AiOutlineLike } from 'react-icons/ai'

const CategoryWiseProductDisplay = ({category, heading}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart, fetchUserLikedProduct } = useContext(Context);

    const handleAddToCart = async(e,id)=>{
   await addToCart(e,id)
      fetchUserAddToCart()
    }

    const handleLikedProduct = async(e,id)=>{
        await likedProduct(e,id)
        fetchUserLikedProduct()
         }

    // const handleLikedProduct = async(e,id)=>{
    //     await likedProduct(e,id)
    //     fetchUserLikedProduct()
    //      }





    const fetchData = async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
       setLoading(false)

        console.log("horizontal data",categoryProduct.data )
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])




  return (
    <div className='container mx-auto px-4 my-6 relative'>

                <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
                <div className='flex items-center gap-4 md:gap-3 
        overflow-x-scroll transition-all'>
             
         
        {   
        loading ? (
            loadingList.map((product, index)=>{
                return (  
            <div className='w-full  min-w-[280px] md:min-w-[320px] 
            max-w-[280px] md:max-w-[320px]
                bg-white rounded-sm shadow '>
                
                <div className='bg-slate-50 h-48  p-4 min-w-[280px] 
                md:min-w-[145px] flex justify-center items-center animate-pulse'>
                  
                </div>
                <div className='p-4 grid gap-2'>
                    <h2 className='font-medium text-base md:text-lg
                    text-ellipsis line-clamp-1 text-black p-1 py-2
                    animate-pulse rounded-full bg-slate-200
                    '></h2>
                    <p className='capitalize text-slate-500
                    p-1 py-2
                    animate-pulse rounded-full bg-slate-200'>
                       </p>
                    <div className='flex gap-3'>
                        <p className='text-orange-500 w-full py-2 font-medium p-1 
                    animate-pulse rounded-full bg-slate-200'>
                            </p>
                        <p className='text-slate-500 py-2 w-full line-through
                        p-1 
                    animate-pulse rounded-full bg-slate-200'>
                            </p>
                    </div>
                    <button className='text-sm text-white
                     p-2 py-2 px-3 rounded-full
                    bg-slate-200 animate-pulse
                    '></button>
                    </div>
                </div>
                )
            })
        ) : (
            data.map((product, index)=>{
                return (  
            <Link to={"/product/"+product?._id} className='w-full  min-w-[200px] md:min-w-[220px] 
            max-w-[280px] md:max-w-[280px]
                bg-white rounded-sm shadow' 
                onClick={scrollTop}>
                
                <div className='bg-slate-100 h-48 p-4 min-w-[200px] 
                md:min-w-[145px] flex justify-center items-center'>
                   <img src={product?.productImage[0]}
                   className='object-scale-down h-full
                   hover:scale-110 transition-all mix-blend-multiply'
                   />
                </div>
                <div className='p-4 grid gap-3'>
                    <h2 className='font-bold text-base md:text-lg
                    text-ellipsis line-clamp-1 text-black
                    '>{product?.productName}</h2>
                    <p className='capitalize text-slate-500'>
                        {/* {product?.category} */}</p>
                        <div className='flex flex-col'>
                    {/* <p className='text-slate-500 line-through'>{displayNARCurrency(product?.price) }</p> */}
                        <p className='text-black text-xl font-medium'>{displayNARCurrency(product?.sellingPrice)}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                    <button className=' text-sm text-orange-500 
                    hover:bg-orange-500 hover:shadow-sm hover:text-white transition-all p-2 py-0.5  rounded-full
                    'onClick={(e)=>handleAddToCart(e,product?._id)}><LiaCartPlusSolid className='text-3xl'/></button>
                        
                        <button className=' text-sm text-orange-500 
                    hover:bg-orange-500 hover:shadow-sm hover:text-white transition-all p-2 py-0.5  rounded-full
                    'onClick={(e)=>handleLikedProduct(e,product?._id)}><AiOutlineLike className='text-3xl'/></button>
                        
                    </div>
                    </div>
                </Link>
                )
            })
        )
                
                }
        </div>
                
    </div>
  )
}

export default CategoryWiseProductDisplay