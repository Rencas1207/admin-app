import { Request, Response } from 'express';
import ProductModel from '../models/product';

export const getAll = async (req: any, res: Response) => {
  const { searchText } = req.query;
  const filter = !searchText ? {} : { name: new RegExp(searchText, 'i') };
  const products = await ProductModel.find(filter);
  // console.log(products, searchText);
  res.status(200).json({ ok: true, data: products });
};

export const getByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const product = await ProductModel.findOne({ code });
    res.status(200).json({ ok: true, data: product });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
};
