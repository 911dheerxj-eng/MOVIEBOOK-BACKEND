import mongoose, { Types } from "mongoose";
import { Tickets } from "./ticket.model.js";


export const createTicketService = async (data) => {
    const ticket = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        no_of_tickets: data.no_of_tickets,
        showDate: data.showDate,
        showTime: data.showTime,
        movieId: data.movieId,
        userId: data.userId,
        status: "booked"
    };
    const result = await Tickets.insertOne(ticket);
    return {
        ...ticket,
        _id: result.insertedId
    };
};


export const cancelTicketService = async (ticketId) => {
    const result = await Tickets.deleteOne(
            { _id: new mongoose.Types.ObjectId(ticketId) },
            {
                $set: {
                    status: "cancelled"
                }
            }
        );
    return result;
};




export const getAllTicketsService = async (userId) => {
const tickets = await Tickets.find({
    userId: new Types.ObjectId(userId)
}).populate("movieId");
return tickets;
};




 export const getAllAdminTicketsService = async () => {
  const tickets = await Tickets.find()
    .populate("userId", "name email")
    .populate("movieId", "name");

  return tickets;
};