import mongoose, { Types } from "mongoose";
import Razorpay from "razorpay";
import { Tickets } from "./ticket.model.js";
import crypto from "crypto"

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
    const result = await Tickets.create(ticket);
    return result;
};


export const cancelTicketService = async (ticketId) => {
    const result = await Tickets.findByIdAndUpdate(
        ticketId,
        {
            $set: {
                status: "cancelled"
            }
        },
        { new: true }
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




export const createRazorPayService = async (data) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: Math.round(data.amount * 100), // paise mein convert karo
        currency: data.currency || "INR",
        receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return order;
};

export const verifyRazorpayPaymentService = async (data) => {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    console.log("Payement Verified");
        
    return true;
  } else {
    console.log("Payement failed");
    return false
  }
 }