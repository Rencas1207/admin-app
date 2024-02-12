import mongoose from 'mongoose';
import SaleModel from '../models/sale';
import ProductModel from '../models/product';

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error('Falta la variable de entorno MONGODB_URL');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Conexion exitosa con mongodb');
    // await ProductModel.create({
    //   name: 'Mouse',
    //   code: 'HSKJD76',
    //   supplier_cost: 43.12,
    // });
  } catch (error) {
    console.log('Hubo un error al conectarnos a la bd');
  }
}

export default connectDB;
