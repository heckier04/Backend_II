import mongoose from 'mongoose';
import UserModel from '../models/user.models.js';

export class UserDAO {
  async createUser(userData) {
    try {
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(`Error al obtener usuario por email: ${error.message}`);
    }
  }

  async getUserById(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }
    try {
      return await UserModel.findById(userId).populate('cart');
    } catch (error) {
      throw new Error(`Error al obtener usuario por ID: ${error.message}`);
    }
  }

  async updateUser(userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }
    try {
      return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }
}
