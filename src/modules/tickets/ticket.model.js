import mongoose, { Types } from "mongoose";

const ticketSchema =new  mongoose.Schema({
 
    phone_number:{
        type:String,
        required:true
    },
    no_of_tickets:{
        type:Number,
        required:true
    },
    showDate:{
        type:Date,
        required:true
    },
    showTime:{
        type:String,
        required:true
    },
    movieId:{
        type:Types.ObjectId,
        ref:"movies",
        requried:true
    },
    userId:{
        type:Types.ObjectId,
        ref:"user",
        requried:true
    }
    
},{
    timestamps:true
})

export const Tickets = mongoose.models.tickets|| mongoose.model("tickets",ticketSchema)