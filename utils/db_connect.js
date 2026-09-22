import mongoose from "mongoose";

export const connectDb = async()=>{
    await mongoose.connect("mongodb://localhost:27017/test")
    console.log("Db connected");
    
}