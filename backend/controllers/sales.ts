import { Request, Response } from 'express';
import SaleModel from '../models/sale';
import ClientModel from '../models/client';

export const getAll = async (req: any, res: Response) => {
  const token = req.cookies.jwt;
  try {
    const sales = await SaleModel.find({ user: req.user.sub });
    res.status(200).json({ ok: true, data: sales });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
};

export const create = async (req: any, res: Response) => {
  const { operation_date, total_amount, products, payment_methods, client } =
    req.body;

  const createdSale = await SaleModel.create({
    operation_date,
    total_amount,
    products,
    payment_methods,
    client,
    user: req.user?.sub,
  });

  await ClientModel.findByIdAndUpdate(createdSale.client, {
    $inc: {
      'sales.count': 1,
      'sales.amount': total_amount,
    },
  });

  res.status(201).json({ ok: true, data: createdSale });
};
