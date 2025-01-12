import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImages';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);

    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      console.log("Uploading file...");
      const uploadImageCloudinary = await uploadImage(file);
      console.log("Upload successful:", uploadImageCloudinary);

      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleDeleteProductImage = (index) => {
    console.log("Deleting image at index:", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", data);

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="fixed bg-opacity-35 flex justify-center items-center bg-slate-200 w-full h-full bottom-0 top-0 left-0 right-0">
      <div className="bg-white rounded p-4 pt-10 w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit cursor-pointer ml-auto text-2xl hover:text-orange-600"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">Brand Name</label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">Category</label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.value}</option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3">Product Image</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 cursor-pointer bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl"><FaCloudUploadAlt /></span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data.productImage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={`Product-${index}`}
                      width={80}
                      height={80}
                      className="bg-slate-100 cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bg-orange-600 rounded-full bottom-0 right-0 p-1 text-white hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-orange-600 text-xs">*Please Upload Product Image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">Price :</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">Selling Price :</label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">Description :</label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            rows={3}
            name="description"
            onChange={handleOnChange}
            value={data.description}
          />

          <button className="px-3 hover:bg-orange-700 text-white py-2 mb-10 bg-orange-600">
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;




/*import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImages';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md'

const UploadProduct = ({
  onClose
}) => {

  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : "",
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
 
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
      [name] : value
      }
        
    })
  }


  const handleUploadProduct = async(e) => {
    const file = e.target.files[0]
   

    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url ]
      }
        
    })
  }

const handleDeleteProductImage = async(index)=> {
  console.log("image index", index)

  const newProductImage = [...data.productImage]
  newProductImage.splice(index,1)

  setData((preve)=>{
    return{
      ...preve,
      productImage : [ ...newProductImage ]
    }
      
  })


}


  {/**Upload product }
    const handleSubmit = (e)=>{
      e.preventDefault()
      console.log("data", data)
    }

  return (
    <div className='fixed bg-opacity-35 flex justify-center items-center bg-slate-200
     w-full h-full bottom-0 top-0 left-0 right-0'>
        <div className='bg-white rounded p-4 w-full max-w-2xl h-full max-h-[80%]
        overflow-hidden'>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg '>Upload Product</h2> 
                <div className='w-fit cursor-pointer ml-auto 
                text-2xl hover:text-red-600' onClick={onClose}>
                    <CgClose/>
                </div>
            </div>

  <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}> {/**overflow will make the for scrollable and set it to y }
        <label htmlFor='productName'>Product Name</label>
        <input 
        type='text' 
        id='productName' 
        placeholder='Enter Product name' 
        name ='productName'
        value={data.productName}
        onChange={handleOnChange}
        className='p-2 bg-slate-100 border rounded'
        />


        <label htmlFor='brandName' className='mt-3'>Brand Name</label>
        <input 
        type='text' 
        id='brandName' 
        placeholder='Enter Brand Name' 
        value={data.brandName}
        name ='brandName'
        onChange={handleOnChange}
        className='p-2 bg-slate-100 border rounded'
        />


      <label htmlFor='category' className='mt-3 '>Category</label>
        <select value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
        <option value={""}>Select Category</option>
            {
              productCategory.map((el,index)=>{
                return (
                  <option value={el.value} key={el.value+index}>{el.value}</option>
                )
              })
            }
           </select>

         <label htmlFor='productImage' className='mt-3 '>Product Image</label>
         <label htmlFor='uploadImageInput'> {/*this label makes the whole div inside it clickable to open a file }
           <div className='p-2 cursor-pointer bg-slate-100 border rounded h-32 w-full flex
              justify-center items-center'>

             <div className='text-slate-500 flex justify-center items-center
               flex-col gap-2'>
                  <span className='text-4xl'> <FaCloudUploadAlt/></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input type='file' id='uploadImageInput' className='hidden'
                  onChange={handleUploadProduct}/>
                   </div>
           </div>
           </label>
              <div>
                {
                  data?.productImage[0] ? (
                 <div className='flex items-center gap-2'>
                  {
                     data.productImage.map((el, index)=>{
                    return(
                      <div className='relative group'>
                     <img src={el} 
                      alt={el}
                      width={80} 
                      height={80} 
                      className='bg-slate-100 cursor-pointer' 
                      onClick={()=>{
                        setOpenFullScreenImage(true)
                        setFullScreenImage(el)
                      }}/>
                      <div className='absolute bg-red-600 rounded-full
                       bottom-0 right-0 p-1 text-white hidden 
                       group-hover:block cursor-pointer'
                       onClick={()=>handleDeleteProductImage(index)}
                       >
                        <MdDelete/>
                        </div>
                      </div>
                 
                    )
                  })
                  }
                    
                 </div>
                  
                  ) : (
                    <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                  )
                }
           
              </div>

              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='Enter Price' 
                value={data.price}
                name ='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                />


        <label htmlFor='sellingPrice' className='mt-3'> Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='Enter selling Price' 
                value={data.sellingPrice}
                name ='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                />

      <label htmlFor='description' className='mt-3'> Description :</label>
      <textarea className='h-28 bg-slate-100 border resize-none p-1' 
      placeholder='Enter product Description' rows={3}
      onChange={handleOnChange} name='description'>

      </textarea>



                  <button className='px-3 hover:bg-red-700 text-white py-2 mb-10 bg-red-600'>Upload Product</button>
    </form>

             
        </div>
      
      {/**dislay image full screen /}
      {
        openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} 
            imgUrl={fullScreenImage}/>
        )
      }
    
    </div>
  )
}

export default UploadProduct*/