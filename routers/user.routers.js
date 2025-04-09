import express from 'express';

const router = express.Router();

// Rutas de ejemplo para usuarios

// Obtener todos los usuarios
router.get('/', (req, res) => {
    res.json({ message: 'Obteniendo todos los usuarios' });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    // Aquí iría la lógica para crear un usuario
    res.json({ message: 'Usuario creado', user: { name, email } });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Aquí iría la lógica para obtener un usuario por su ID
    res.json({ message: `Obteniendo usuario con ID: ${id}` });
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    // Aquí iría la lógica para actualizar un usuario
    res.json({ message: `Usuario con ID: ${id} actualizado`, user: { name, email } });
});

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // Aquí iría la lógica para eliminar un usuario
    res.json({ message: `Usuario con ID: ${id} eliminado` });
});

export default router;