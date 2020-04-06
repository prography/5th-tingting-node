const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, html) => {
    const mailConfig = {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    }

    try {
      const message = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject,
        html
      }
      const transporter = nodemailer.createTransport(mailConfig)
      transporter.sendMail(message)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

module.exports = sendEmail