import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const registerService = async (data) => {
    const user = await mongoose.connection.db.collection("users").findOne({
        email: data.email
    })
    if (user) {
        return null
    }
    const encryptedPassword =await bcrypt.hash(data.password,10);
    const newUser = await mongoose.connection.db.collection("users").insertOne({
        name: data.name,
        email: data.email,
        password: encryptedPassword
    })
    return newUser
}





export const loginService = async (data) => {

    const user = await mongoose.connection.db.collection("users").findOne({
        email: data.email,        
    })
    
    if (!user) {
        return null;
    }

    const result = await bcrypt.compare(data.password,user.password);
    if(result==true){
        const token = jwt.sign({userId:user._id},process.env.JWT_SIGN)
        user["token"] =token
        delete user.password
        return user;
    }
    else{
        return null;
    }
}