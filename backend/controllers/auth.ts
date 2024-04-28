import { Request, Response } from 'express';
import sendEmail from '../helpers/mailer';
import UserModel from '../models/user';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { code } = req.body;

  const user = await UserModel.findOne({ email, login_code: code });

  if (!user) {
    return res.status(400).json({ ok: false, message: 'Código incorrecto' });
  }

  const tokenPayload = {
    sub: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    roles: user.roles,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY as string);

  res.cookie('jwt', token, {
    maxAge: 1000 * 60 * 60 * 24 * 180, // 1seg 1min 1hrs 1day 1months
  });
  res.status(200).json({
    ok: true,
    data: tokenPayload,
    message: 'Inicio de sesión exitoso',
  });
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
  res.status(200).json({ ok: true, message: 'Código enviado con éxito' });
};
