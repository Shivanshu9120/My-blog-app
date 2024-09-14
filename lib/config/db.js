import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://Shivanshu_08:Shivanshu183@cluster0.oxyht.mongodb.net/my-blog-app');
    console.log("DB connected")
}