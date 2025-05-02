// models/ticket.model.js
import mongoose from 'mongoose';
import { ticketSchema } from '../schema/ticket.schema';

const ticketCollection = 'tickets';

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
