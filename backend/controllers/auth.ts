import { Request, Response } from 'express';
import sendEmail from '../helpers/mailer';
import UserModel from '../models/user';

export const login = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { code } = req.body;

  const user = await UserModel.findOne({ email, login_code: code });

  if (!user) {
    return res.status(400).json({ ok: false, message: 'Código incorrecto' });
  }

  res.status(200).json({ ok: true, message: 'Inicio de sesión exitoso' });
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
    subject: `Hola 😀, este es tú código para ingresar ${user.login_code}`,
    html: `Código: ${user.login_code}`,
  });
  res.send('Generate code');
};
