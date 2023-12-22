import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
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
      subject,
      html,
    });

    console.log({ result });
    return {
      ok: true,
      message: 'Excelente, mail enviado con éxito',
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: 'Hubo un problema al enviar el email',
      err: error,
    };
  }
};

export default sendEmail;
