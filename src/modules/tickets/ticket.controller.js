import { createTicketService, cancelTicketService, getAllTicketsService, getAllAdminTicketsService } from "./ticket.service.js";

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
    const ticket = await cancelTicketService(req.params.ticketId);
    res.json({
        success: true,
        message: "Ticket cancelled successfully",
        data: ticket
    });
}



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