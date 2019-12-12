import nodemailer from 'nodemailer'
import CONFIG from './configs'
const Email = CONFIG.Email

interface sendInfo {
  from: string, // 谁发的
  to: string, // 发给谁
  subject: string, // 主题
  text: string,
  html: string
}
// async..await is not allowed in global scope, must use a wrapper
async function send(sendInfo: sendInfo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: Email.host,
    port: Email.port,
    secure: Email.secure, // true for 465, false for other ports
    auth: {
      user: Email.auth.user, // generated ethereal user
      pass: Email.auth.pass, // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: sendInfo.from, // sender address
    to: sendInfo.to, // list of receivers
    subject: sendInfo.subject, // Subject line
    text: sendInfo.text, // plain text body
    html: sendInfo.html, // html body
  })

  return `Message sent: ${info.messageId}`
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error)

export default send
