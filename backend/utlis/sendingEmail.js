const nodemailer = require('nodemailer');

// Create a transporter using Gmail
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fixnyourway@gmail.com', // your Gmail address
    pass: 'guyziz@1',     // your Gmail App Password or actual password (for less secure apps)
  },
});

// Set up email options
let mailOptions = {
  from: 'fixnyourway@gmail.com', // sender address
  to: 'recipient-email@example.com', // list of receivers
  subject: 'Reset Password', // Subject line
  text: 'Forgot Your Password! Dont worry we have got you!', // plain text body
  html:`please click on the link to reset password http://www.finx.com/resetpassword`, // HTML body
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
