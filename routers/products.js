import express from 'express';

const router = express.Router();

// Rutas de ejemplo para productos

// Obtener todos los productos
router.get('/', (req, res) => {
    res.json({ message: 'Obteniendo todos los productos' });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const { name, price, description } = req.body;
    // Aquí iría la lógica para crear un producto
    res.json({ message: 'Producto creado', product: { name, price, description } });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Aquí iría la lógica para obtener un producto por su ID
    res.json({ message: `Obteniendo producto con ID: ${id}` });
});

// Actualizar un producto por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    // Aquí iría la lógica para actualizar un producto
    res.json({ message: `Producto con ID: ${id} actualizado`, product: { name, price, description } });
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // Aquí iría la lógica para eliminar un producto
    res.json({ message: `Producto con ID: ${id} eliminado` });
});

export default router;