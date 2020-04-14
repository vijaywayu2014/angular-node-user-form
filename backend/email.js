var nodemailer = require('nodemailer');

module.exports = {
sendEmail: function (to) {
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
  auth: {
    user: 'ankushmetla00@gmail.com',
    pass: 'ankushmetla007'
  },
  tls: {
      rejectUnauthorized: false
  },
});

var mailOptions = {
  from: 'ankushmetla00@gmail.com',
  to: to,
  subject: 'Registration',
  text: 'You are successfully registered with our service'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
}
}