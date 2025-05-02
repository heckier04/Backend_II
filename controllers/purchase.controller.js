import { CartDAO } from '../persistencia/dao/cart.dao.js';
import { ProductDAO } from '../persistencia/dao/product.dao.js';
import { TicketDAO } from '../persistencia/dao/ticket.dao.js';
import TicketDTO from '../dtos/ticket.dto.js';
import { v4 as uuidv4 } from 'uuid';

const cartDAO = new CartDAO();
const productDAO = new ProductDAO();
const ticketDAO = new TicketDAO();

export const purchaseCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const user = req.user; 
        const cart = await cartDAO.getCartById(cartId);

    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const productsNotPurchased = [];
    let totalAmount = 0;

    for (const item of cart.products) {
        const product = await productDAO.getProductById(item.product._id);

    if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productDAO.updateProduct(product._id, { stock: product.stock });

        totalAmount += product.price * item.quantity;
    } else {
        productsNotPurchased.push(item.product._id); 
        }
    }

    
    let ticket = null;
    if (totalAmount > 0) {
        ticket = await ticketDAO.createTicket({
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: user.email,
        });
    }

    cart.products = cart.products.filter(item => productsNotPurchased.includes(item.product._id));
    await cartDAO.updateCart(cartId, cart);

    res.status(200).json({
        message: ticket ? 'Compra realizada parcialmente o completa' : 'No se pudo comprar ningún producto',
        ticket: ticket ? new TicketDTO(ticket) : null,
        productsNotPurchased, 
        });
    } catch (error) {
    res.status(500).json({ error: 'Error en el proceso de compra: ' + error.message });
    }
};
