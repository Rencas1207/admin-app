import nodemailer from 'nodemailer';
import { MyError } from '../schemas/errors';

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

type EmailParams = {
  to: string;
  subject: string;
  html: string;
};

const sendEmail = async ({ to, subject, html }: EmailParams) => {
  try {
    const result = await transporter.sendMail({
      from: 'Company 👻<20162800@unica.edu.pe>', // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });

    console.log({ result });
    return {
      ok: true,
      message: 'Excelente, mail enviado con éxito!',
    };
  } catch (error) {
    console.log({ error });
    throw new MyError('Error al enviar email', 500, error);
  }
};

export default sendEmail;
