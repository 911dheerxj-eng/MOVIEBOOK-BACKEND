import { createTicketService,cancelTicketService } from "./ticket.service.js";


export const createTicketController = async (req, res) => {
        const ticket = await createTicketService(req.body);
        res.json({
            success: true,
            message: "Ticket booked successfully",
            data: ticket
        });
    }



    export const cancelTicketController = async (req, res) => {
        const ticket = await cancelTicketService(req.params.ticketId);
            res.json({
            success: true,
            message: "Ticket cancelled successfully",
            data: ticket
        });
    }