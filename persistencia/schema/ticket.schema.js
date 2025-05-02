// schema/ticket.schema.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const ticketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      default: uuidv4
    },
    purchase_datetime: {
      type: Date,
      default: Date.now
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    purchaser: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);
