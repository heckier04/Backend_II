import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    thumbnails: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^(http|https):\/\/[^ "]+$/.test(v); 
          },
          message: 'La URL de la imagen no es válida',
        },
      },
    ],
  },
  {timestamps: true,versionKey: false,}
);

export default mongoose.model('Product', productSchema);
