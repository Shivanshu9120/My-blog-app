import { blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {

  const [menu,setMenu] = useState("All");
  const [blogs,setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);  // Ensure loading state is defined
  const [error, setError] = useState(null);

  const fetchBlogs = async () =>{
    setLoading(true); //set loading to true when starting to fetch
    setError(null);
    try {const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  } catch (err) {
    setError("Failed to load blogs. Please try again later.");
    console.error(err);
  }
  setLoading(false);  // Set loading to false when done
  };

  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
        <button onClick={()=>setMenu('All')} className={menu==="All"?'bg-black text-white py-1 px-4 rounded-sm':""}>All</button>
        <button onClick={()=>setMenu('Technology')} className={menu==="Technology"?'bg-black text-white py-1 px-4 rounded-sm':""}>Technology</button>
        <button onClick={()=>setMenu('Startup')} className={menu==="Startup"?'bg-black text-white py-1 px-4 rounded-sm':""}>Startup</button>
        <button onClick={()=>setMenu('Lifestyle')} className={menu==="Lifestyle"?'bg-black text-white py-1 px-4 rounded-sm':""}>Lifestyle</button>
      </div>

       {/* Loading Spinner */}
       {loading && <div className="text-center">Loading...</div>}

       {/* Error Message */}
       {error && <div className="text-center text-red-500">{error}</div>}

       {/* Blog List */}
       {!loading && !error && blogs.length === 0 && (
       <div className="text-center">No blogs available.</div>
       )}

      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {blogs.filter((item)=> menu==="All"?true:item.category===menu).map((item,index)=>{
            return <BlogItem key={index} id={item._id} image={item.image} title={item.title} category={item.category} description={item.description} />
        })}
      </div>
    </div>
  )
}

export default BlogList
