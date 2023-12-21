import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  console.log('login');
  res.send('Login');
};

export const generateCode = (req: Request, res: Response) => {
  const { email } = req.params;
  console.log(email);
  res.send('Generate code');
};
