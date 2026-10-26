import { validateUser } from "../../middlewares/auth.middleware.js";
import { cancelTicketController, createTicketController, getAllTicketsController, getAllAdminTicketsController} from "./ticket.controller.js";
import express from "express";


export const ticketRouter = express.Router();


ticketRouter.post("/",validateUser,createTicketController)
ticketRouter.get("/all",validateUser,getAllTicketsController)
ticketRouter.delete("/:ticketId",cancelTicketController)
ticketRouter.get("/admin/all",validateUser,getAllAdminTicketsController);