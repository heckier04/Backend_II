import { TicketDAO } from '../persistencia/dao/ticket.dao.js';

const ticketDAO = new TicketDAO();

// Crear un nuevo ticket
export const createTicket = async (req, res) => {
  try {
    const ticket = await ticketDAO.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: `Error al crear el ticket: ${error.message}` });
  }
};

// Obtener un ticket por ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await ticketDAO.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: `El ticket con ID ${req.params.id} no fue encontrado` });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener el ticket: ${error.message}` });
  }
};

// Obtener todos los tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketDAO.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los tickets: ${error.message}` });
  }
};
