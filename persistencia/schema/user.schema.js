import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validación para formato de email
        },
        message: 'El email no es válido',
      },
    },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Método para validar la contraseña
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);
