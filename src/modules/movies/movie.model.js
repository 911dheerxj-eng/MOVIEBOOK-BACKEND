import mongoose, { Types } from "mongoose";

const movieSchema =new  mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    rating:{
        type:String,
        required:true
    },
    publishDate:{
        type:Date,
        required:true
    },
    noOfTickets:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    
    timings:{
        type:Array,
        required:true
    }
},{
    timestamps:true
})

export const Movies = mongoose.models.movies || mongoose.model("movies", movieSchema);