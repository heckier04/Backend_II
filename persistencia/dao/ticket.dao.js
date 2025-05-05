import TicketModel from '../models/ticket.model.js';
export class TicketDAO {
    async createTicket(data) {
        return await TicketModel.create(data);
    }

    async getTicketById(id) {
        return await TicketModel.findById(id);
    }

    async getAllTickets() {
        return await TicketModel.find();
    }
}
