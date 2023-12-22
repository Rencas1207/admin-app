import { Request, Response } from 'express';
import sendEmail from '../helpers/mailer';
import UserModel from '../models/user';

export const login = (req: Request, res: Response) => {
  const { email } = req.params;
  const { code } = req.body;
  res.send('Login');
};

export const generateCode = async (req: Request, res: Response) => {
  const { email } = req.params;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ ok: false, message: 'El usuario no existe' });
  }

  let randomCode = '';

  for (let index = 0; index <= 5; index++) {
    const number = Math.floor(Math.random() * 10);
    randomCode += number;
  }

  user.login_code = randomCode;
  await user.save();

  sendEmail({
    to: email,
    subject: 'esto es tu codigo',
    html: 'codigo para ingresar: ',
  });
  res.send('Generate code');
};
