import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes';
import connectDB from './db/connect';
import cookieParser from 'cookie-parser';

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/api', routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('App escuchando en puerto: ', PORT);
});
