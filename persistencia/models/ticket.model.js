// models/ticket.model.js
import mongoose from 'mongoose';
import { ticketSchema } from '../schema/ticket.schema.js'; // Asegúrate de que la extensión sea .js

const ticketCollection = 'tickets';

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
