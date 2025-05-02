import { Router } from 'express';
import {createTicket,getTicketById,getAllTickets} from '../controllers/ticket.controll.js';

const router = Router();


router.post('/', createTicket);

router.get('/', getAllTickets);

router.get('/:id', getTicketById);

export default router;