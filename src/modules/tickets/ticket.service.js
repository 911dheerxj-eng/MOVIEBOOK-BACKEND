import mongoose from "mongoose";


export const createTicketService = async(data)=>{
    const ticket = {
      id : data.id,
      movie_id : data.movie_id,
      no_of_ticket : data.no_of_ticket,
      show_date : data.show_date,
      show_time : data.show_time,
      userId:data.userId,
      status : "booked"
    };
    const result = await mongoose.connection.db.collection("tickets").insertOne(ticket);

    return {
        ...ticket,
        _id: result.insertedId
    };
};




export const cancelTicketService = async (ticketId) => {
    const result = await mongoose.connection.db.collection("tickets").deleteOne(
            { _id: new mongoose.Types.ObjectId(ticketId) },
            {
                $set: {
                    status: "cancelled"
                }
            }
        );

    return result;
};