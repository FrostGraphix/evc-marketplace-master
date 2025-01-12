import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
        const [categoryProduct, setCategoryProduct] = useState([])
        const [loading, setLoading] = useState(false)

        const categoryLoading = new Array(13).fill(null)  //this line is to display an image before the category image load each time we refresh or login to home page
      
  const fetchCategoryProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)

        }

        useEffect(()=>{
            fetchCategoryProduct()
        },[])
            
return (
<div className=' container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between 
        overflow-scroll scrollbar-none'>
        {

        loading ? ( 
            //this line is to display an image before the category image load each time we refresh or login to home page
                categoryLoading.map((el,index)=>{
                    return(
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden
                        bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                        </div>
                    )
                })
        ) : 
        (
            categoryProduct.map((product,index)=>{
                return(
                    //+product?.category is to take the link to each category page
                    //mix-blend-multiply css takes away the image background
                    <Link to={"/product-category?category="+product?.category} 
                    className='cursor-pointer' key={product?.category}>
                        <div className='md:w-20 md:h-20 rounded-full
                        w-16 h-16 
                        overflow-hidden p-4 bg-slate-200 flex items-center 
                        justify-center'>
                            <img src={product?.productImage[0]} 
                            alt={product?.category} 
                            className='h-full object-scale-down mix-blend-multiply
                            hover:scale-125 transition-all'/>
                            
                        </div>
                        <p className='text-center text-sm 
                        md:text-base capitalize'>{product?.category}</p>
                    </Link>
                )
                })
        )
           
        }
        </div>
</div>
)
    }

export default CategoryList