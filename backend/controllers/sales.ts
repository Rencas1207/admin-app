import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  console.log({ req });

  res.status(200).json({ ok: true, data: [] });
};
