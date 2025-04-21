import UserModel from '../models/user.models.js';

export class UserDAO {
  async createUser(userData) {
    try {
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(`Error al obtener el usuario con email ${email}: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      return await UserModel.findById(userId).populate('cart');
    } catch (error) {
      throw new Error(`Error al obtener el usuario con ID ${userId}: ${error.message}`);
    }
  }
}
