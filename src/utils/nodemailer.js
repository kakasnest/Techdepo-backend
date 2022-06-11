import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const options = {
  auth: {
    api_key: process.env.KEY,
  },
};

const client = nodemailer.createTransport(sgTransport(options));

export const send = async ({ to, subject, html }) => {
  const email = {
    from: process.env.FROM,
    to,
    subject,
    html,
  };

  client.sendMail(email, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: ", info);
    }
  });
};
