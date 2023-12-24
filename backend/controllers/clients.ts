import { Request, Response } from 'express';
import ClientModel from '../models/client';

export const getAll = async (req: any, res: Response) => {
  try {
    const clients = await ClientModel.find({ user: req.user.sub });
    res.status(200).json({ ok: true, data: clients });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
};

export const create = async (req: any, res: Response) => {
  const createdClient = await ClientModel.create(req.body);
  res.status(201).json({ ok: true, data: createdClient });
  console.log(createdClient);
};
