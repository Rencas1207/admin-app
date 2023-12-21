import mongoose from 'mongoose';
import UserModel from '../models/user';

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error('Falta la variable de entorno MONGODB_URL');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Conexion exitosa con mongodb');
    //  const newUser = new UserModel({
    //    firstname: 'Renzo',
    //    lastname: 'Castilla',
    //    email: 'rencasdag.12@gmail.com',
    //    login_code: '123456',
    //    roles: {
    //      admin: true,
    //      seller: true,
    //    },
    //  });
    //  console.log({ newUser });
    //  await newUser.save();
  } catch (error) {
    console.log('Hubo un error al conectarnos a la bd');
  }
}

export default connectDB;
