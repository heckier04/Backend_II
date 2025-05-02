import TicketModel from '../models/ticket.model.js';
class TicketMongoDAO {
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

export default TicketMongoDAO;
