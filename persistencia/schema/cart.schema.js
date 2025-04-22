import mongoose from 'mongoose';

export const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,    
    },
    products: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
          quantity: { type: Number, required: true, min: 1 },
        }
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// **Elimina esta línea completamente:**
// cartSchema.index({ user: 1 });

export default mongoose.model('Cart', cartSchema);
