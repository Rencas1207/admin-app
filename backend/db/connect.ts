import mongoose from 'mongoose';
import SaleModel from '../models/sale';

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error('Falta la variable de entorno MONGODB_URL');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Conexion exitosa con mongodb');
    // await SaleModel.create({
    //   operation_date: new Date(),
    //   user: '6583a6dff60349682f93f823',
    //   total_amount: 5000,
    // });
  } catch (error) {
    console.log('Hubo un error al conectarnos a la bd');
  }
}

export default connectDB;
