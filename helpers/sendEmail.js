const nodemailer = require("nodemailer");
require("dotenv").config();

const { PASS_EMAIL, USER_EMAIL } = process.env;

const sendEmail = async ({ to, subject, html }) => {
  const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: USER_EMAIL,
      pass: PASS_EMAIL,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const email = {
    to,
    from: USER_EMAIL,
    subject,
    html,
  };

  await transport.sendMail(email);
};

module.exports = sendEmail;
