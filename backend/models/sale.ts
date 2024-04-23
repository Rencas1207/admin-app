import { Schema, Types, model } from 'mongoose';

export const paymentMethodSchema = new Schema({
  method: { type: String },
  amount: { type: Number, required: true },
  time_unit: { type: String, required: true },
  time_value: { type: Number, required: true },
});

const saleSchema = new Schema({
  operation_date: Date,
  total_amount: Number,
  products: [
    {
      code: String,
      name: String,
      qty: Number,
      unit_price: Number,
      discount: {
        type: Number,
        default: 0,
      },
    },
  ],
  payment_methods: [paymentMethodSchema],
  user: { type: Types.ObjectId, ref: 'User' },
  client: { type: Types.ObjectId, ref: 'Client' },
});

const SaleModel = model('Sale', saleSchema, 'sales');

export default SaleModel;
