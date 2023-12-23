import { Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export const getAll = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    console.log(user);

    res.status(200).json({ ok: true, data: [] });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.log({ name: error.name, message: error.message });
      return res.status(401).json({ ok: false, message: error.message });
    }

    res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
};
