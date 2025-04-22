import mongoose from 'mongoose';
import { userSchema } from '../schema/user.schema.js';

const userCollection = 'users';

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;

