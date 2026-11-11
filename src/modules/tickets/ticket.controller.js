import { createTicketService, cancelTicketService, getAllTicketsService, getAllAdminTicketsService, createRazorPayService, verifyRazorpayPaymentService, checkStatusService } from "./ticket.service.js";

import crypto from "crypto"
export const createTicketController = async (req, res) => {
  try {
    const ticket = await createTicketService({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).json({
      success: true,
      message: "Ticket booked successfully",
      data: ticket,
    });
  } catch (error) {
    console.log("CREATE TICKET ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Ticket booking failed",
      error: error.message,
    });
  }
};



export const cancelTicketController = async (req, res) => {
  try {
    const ticket = await cancelTicketService(req.params.ticketId);
    res.json({
      success: true,
      message: "Ticket cancelled successfully",
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel ticket",
      error: error.message
    });
  }
};



export const getAllTicketsController = async (req, res) => {
  try {
    const tickets = await getAllTicketsService(req.userId);
    res.json({
      success: true,
      message: "Tickets fetched successfully",
      data: tickets,
    });
  } catch (error) {
    console.log("GET BOOKINGS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
      error: error.message,
    });
  }
};



export const getAllAdminTicketsController = async (req, res) => {
  try {
    const tickets = await getAllAdminTicketsService();
    res.json({
      success: true,
      message: "All bookings fetched successfully",
      data: tickets,
    });
  } catch (error) {
    console.log("GET ADMIN BOOKINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch all bookings",
      error: error.message,
    });
  }
};





export const createRazorpayController = async (req, res) => {
  try {
    const response = await createRazorPayService({...req.body, userId: req.userId,});
    res.json(response);
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyRazorpayConroller=async(req,res)=>{
  try {
     const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    // Get Razorpay signature
    const signature = req.headers["x-razorpay-signature"];
    if (!webhookSecret || !signature ) {
      return res.status(400).json({
        message: "Invalid webhook request",
      });
    } 
    // Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(Buffer.from(JSON.stringify(req.body)))
      .digest();

    // Compare signatures safely
    const receivedSignature = Buffer.from(signature, "hex");

    if ( receivedSignature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(receivedSignature, expectedSignature)
    ) {
      return res.status(400).json({
        status:false,
        message: "Invalid Razorpay signature",
      });
    }

    // Parse body only after signature verification
    
    
    // console.log("Razorpay Webhook Event:", req.body.event);
     verifyRazorpayPaymentService(req.body)
    res.send({status:true})
  } catch (error) {
     console.log("RAZORPAY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
    
  }
}

export const checkStatusController=async(req,res)=>{
  const response = await checkStatusService(req.body.razorpay_order_id)
  if(response){
    res.send({
      message:"Movie booked success"
    })
  }
  else{
    res.send({
      message:"Movie not booked"
    })
  }

}