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
        razorpay_order_id:data.razorpay_order_id,
        status: "pending",
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
   await createTicketService({...data,razorpay_order_id:order.id})
    return order;
};




export const verifyRazorpayPaymentService = async (data) => {
    
    try {
        // 6. Handle different events
        switch (data.event) {

            case "payment.captured":
                console.log("Payment successfull");
                const payment =
                    data.payload.payment.entity;
                console.log("Payment ID:", payment.id);
                console.log("Order ID:", payment.order_id);
                console.log("Amount:", payment.amount);
                console.log("Status:", payment.status);
                await Tickets.findOneAndUpdate({
                    razorpay_order_id:payment.order_id
                },{
                    $set:{
                        status:"booked"
                    }
                })

                // Update payment status in database
                break;

            case "payment.failed":
                console.log("Payment failed");

                const failedPayment =
                    data.payload.payment.entity;

                console.log("Payment ID:", failedPayment.id);

                // Update payment status in database
                break;

           
            default:
                console.log("Unhandled event:", data.event);
        }

      

    } catch (error) {
        console.error("Webhook Error:", error);

        return res.status(500).json({
            success: false,
            message: "Webhook processing failed",
        });
    }
}

