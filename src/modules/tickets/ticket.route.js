import { validateUser } from "../../middlewares/auth.middleware.js";
import { cancelTicketController, createTicketController } from "./ticket.controller.js";
import express from "express";
export const ticketRouter = express.Router();



ticketRouter.post("/",validateUser,createTicketController)
ticketRouter.patch("/cancel/:ticketId",cancelTicketController)