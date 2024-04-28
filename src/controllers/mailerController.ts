import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import { mailConfig } from '../configs/mailConfig.js'
import path from 'path';
const __dirname = path.resolve()

const mailController = async (req: Request, res: Response) => {
  try {
    const {email, username} = req.body as {email: string, username: string;};
    const dataSend = {
      from: process.env.MY_EMAIL_SENDER, // this is main mail
      to: process.env.MY_EMAIL_RECEIVER, // in this line should be from req.body.email
      subject: 'Thank you for registering!',
      html: `
      <>
      <div>Dear ${username} with email ${email}, thank you for subscription. NodeMailer sender! </div>
      <a style="padding:8px;background:#31c48d; color:#fff;border-radius:8px; text-decoration:none" href="https://www.linkedin.com/in/aleksey-svyrydov-a52081109/">No you can login to our site</a>
      <img src="cid:unique@kreata.ee" />
      `,
      attachments: [{
        path: __dirname + '/public/images/image.png',
        cid: "unique@kreata.ee",
      }],
    }
    const transporter = nodemailer.createTransport(mailConfig);

    await transporter.sendMail(dataSend);
    res.status(201).json({message: 'User was registered successfully, And message was sent an the email!', data: req.body.user})
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error)
  }
}

export {mailController}