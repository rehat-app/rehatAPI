const nodemailer = require('nodemailer');

exports.sendEmail = async (email, token) => {
  const userEmail = email;
  const userToken = token;

  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pratamalutfi6060@gmail.com', // Your email id
      pass: 'lutfiupn049', // Your password
    },
  });

  const mailOptions = {
    from: 'pratamalutfi6060@gmail.com',
    to: userEmail,
    subject: 'Reset Password Link - Rehat App',
    html:
      '<h3>Link untuk ganti password</h3><br><p>Permintaan kamu terpenuhi, klik link berikut untuk mengubah password <a href="http://localhost:4000/reset-password?token=' +
      userToken +
      '">link</a> reset password-mu!</p><br><b>Jangan bagikan link tersebut ke publik</b>',
  };

  await mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(1);
    }
  });
};
