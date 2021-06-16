const nodemailer = require("nodemailer")

console.log(process.env.MAIL_HOST)
console.log(process.env.MAIL_USER)

exports.sendmail = async function () {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: "mecha2k@naver.com",
    to: "mecha2k@gmail.com, mecha2k@naver.com",
    subject: "Hello Greetings!",
    text: "Hello world?",
    html: "<b>Hello world?</b>"
  })

  console.log("Message sent: %s", info.messageId)
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

// sendmail().catch(console.error)
