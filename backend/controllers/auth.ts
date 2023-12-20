import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  console.log('login');
  res.send('Login');
};

export const generateCode = (req: Request, res: Response) => {
  console.log('generate code');
  res.send('Generate code');
};
