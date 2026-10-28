import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "./auth.model.js"



export const registerService = async (data) => {
    const user = await User.findOne({
        email: data.email
    })
    if (user) {
        return null
    }
    const encryptedPassword =await bcrypt.hash(data.password,10);
    const newUser = await User.insertOne({
        name: data.name,
        email: data.email,
        password: encryptedPassword
    })
     const token = jwt.sign({userId:newUser._id},process.env.JWT_SIGN)

    return {...newUser.toJSON(),token}
}





export const loginService = async (data) => {
    const user = await User.findOne({
        email: data.email,        
    })
    if (!user) {
        return null;n
    }
    const result = await bcrypt.compare(data.password,user.password);
    if(result==true){
        const token = jwt.sign({userId:user._id},process.env.JWT_SIGN)
        user["token"] =token
        delete user.password
        return {...user.toJSON(),token};
    }
    else{
        return null;
    }
}


export const getUsersService = async () => {
    const users = await User
        .find({}, { projection: { password: 0 } })
        

    return users;
};