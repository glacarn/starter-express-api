const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,   //465 or 587
  //secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MOT_DE_PASSE
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.envoiMail = (objet, corpsMail) => {
  return new Promise((mailOk, erreurMail) => {
    var mailOptions = {
      from: process.env.EMAIL,
      to: process.env.DESTINATAIRE_EMAIL,
      subject: objet,
      html: corpsMail
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        erreurMail(error);
      } else {
        mailOk(info);
      }
    });
  });
}
