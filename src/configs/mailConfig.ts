const mailConfig = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MY_EMAIL_SENDER,
    pass: process.env.MY_EMAIL_PASS
  }
}

export {mailConfig}