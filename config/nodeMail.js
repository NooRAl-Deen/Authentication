const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = (user) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.AUTH_USER_EMAIL,
          pass: process.env.AUTH_USER_PASS
        }
      });
      
      let mailOptions = {
        from: process.env.AUTH_USER_EMAIL,
        to: user.email,
        subject: 'Reset Your Password',
        text: `Hello ${user.displayName}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = sendEmail;