'use client';
import React, { useState,useEffect } from 'react'
import Layout from '../layout'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Add ToastContainer and toast import
import 'react-toastify/dist/ReactToastify.css';

const page = () => {

  const [image,setImage] = useState(null);
  const [data,setData] = useState({
    title:"",
    description:"",
    category:"Startup",
    author:"Alex Bennett",
    authorImg:"/author_img.png",
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
    console.log(data);
  };

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('description', data.description);
    formData.append('category',data.category);
    formData.append('author',data.author);
    formData.append('authorImg',data.authorImg);
    formData.append('image',image);
    const response = await axios.post('/api/blog',formData);
    if (response.data.success){
       toast.success(response.data.msg);
       setImage(false);
       setData({
       title:"",
       description:"",
       category:"Startup",
       author:"Alex Bennett",
       authorImg:"/author_img.png",
       })
    }
    else{
      toast.header("error")
    }
  };

  return (
    <>
    <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16 max-h-[100vh] '>
      <p className='text-xl '>Upload thumbnail</p>
      <label htmlFor='image'>
        <Image className='mt-2' src={!image?assets.upload_area:URL.createObjectURL(image)} width={120} height={40} alt=''/>
      </label>
      <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
      <p className='text-xl mt-2'>Blog Title</p>
      <input name='title' onChange={onChangeHandler} value={data.title}  required className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Type here'/>
      <p className='text-xl mt-2'>Blog Description</p>
      <textarea name='description' onChange={onChangeHandler} value={data.description} required className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Write content here' rows={6} />
      <p className='text-xl mt-2'>Blog Category</p>
      <select name='category' onChange={onChangeHandler} value={data.category} className='w-40 mt-2 px-4 py-3 border text-gray-500'>
        <option value='Startup'>Startup</option>
        <option value='Technology'>Technology</option>
        <option value='Lifestyle'>Lifestyle</option>
      </select>
      <br/>
      <button type='submit' className='mt-4 mb-2 w-40 h-12 bg-black text-white rounded-3xl'>ADD</button>
      </form>
    
    </>
  )
}

export default page
