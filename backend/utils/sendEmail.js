const nodemailer = require('nodemailer')

async function sendEmail(email, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    })

    const response = await transporter.sendMail({
      from: 'email@albae69.dev',
      to: email,
      subject: subject,
      text: text,
    })
    console.log('email sent succesfully', response)
  } catch (error) {
    console.log('failed to send email')
    console.error(error)
  }
}

module.exports = sendEmail
