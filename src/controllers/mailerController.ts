import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import { mailConfig } from '../configs/mailConfig.js'

const mailController = async (req: Request, res: Response) => {
  try {
    const {email, username} = req.body as {email: string, username: string;};
    const dataSend = {
      from: process.env.MY_EMAIL_SENDER, // this is main mail
      to: process.env.MY_EMAIL_RECEIVER, // in this line should be from req.body.email
      subject: 'Thank you for registering!',
      text: `Dear ${username} with email ${email}, thank you for subscription. NodeMailer sender!`,
      attachments: [],
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