import mongoose from 'mongoose';
import { userSchema } from '../schema/user.schema.js';

const userCollection = 'users';

// Agregar índices para mejorar el rendimiento en consultas frecuentes
userSchema.index({ email: 1 }, { unique: true }); // Índice único para el email

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;

