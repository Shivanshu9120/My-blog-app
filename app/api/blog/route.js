import { ConnectDB } from "@/lib/config/db";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path'; // Import path module to handle file paths
import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
const fs = require('fs')

// Connect to MongoDB
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//Api endpoint to get all blogs
// GET request handler
export async function GET(request) {

  const blogId = request.nextUrl.searchParams.get("id");
  if(blogId){
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({blog});
  }
  else{
    const blogs = await BlogModel.find({});
    return NextResponse.json({blogs});
  }

  const blogs = await BlogModel.find({});

  return NextResponse.json({blogs});
}


//Api endpoint for uploading blogs
// POST request handler to upload and save an image
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    // Extract image from form data
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Construct path to save the file
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const imagePath = path.join(uploadDir, `${timestamp}_${image.name}`);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write the image file to the directory
    await writeFile(imagePath, buffer);

    // Construct the image URL (accessible from the public folder)
    const imgUrl = `/uploads/${timestamp}_${image.name}`;

    const blogData = {
      title:`${formData.get('title')}`,
      description:`${formData.get('description')}`,
      category:`${formData.get('category')}`,
      author:`${formData.get('author')}`,
      image:`${imgUrl}`,
      authorImg:`${formData.get('authorImg')}`
    }

    await BlogModel.create(blogData);
    console.log("Blog Saved")

    return NextResponse.json({ success:true,msg:"Blog Added"});
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

//Creating api endpoint to delete blog

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"})
}
