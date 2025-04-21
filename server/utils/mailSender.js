const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    console.log("Starting mailSender with:", { email, title })
    console.log("Environment variables:", {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      hasPass: !!process.env.MAIL_PASS
    })

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    console.log("Transporter created successfully")

    let info = await transporter.sendMail({
      from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    
    console.log("Email sent successfully. Response:", info.response)
    console.log("Full info object:", info)
    return info
  } catch (error) {
    console.error("Error in mailSender:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return error.message
  }
}

module.exports = mailSender
