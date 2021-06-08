const nodemailer = require("nodemailer");
const loadConfig = require("../config/nodemailer");

const HttpError = require("../utils/httpError");
const ERRORS = require("../utils/constants");

exports.sendMailWithPlan = async (email, text, subject) => {
  if (!email || !subject || !text)
    throw new HttpError(400, ERRORS.INVALID_USER);

  const mailConfig = await loadConfig();
  const transport = nodemailer.createTransport(mailConfig);
  const message = {
    from: "test.node.madeleine@gmail.com",
    to: "madeleine_elliot@hotmail.com",
    //should be client email
    subject,
    text,
    replyTo: email,
  };
  transport.sendMail(message, (err, info) => {
    console.log(info, err);
  });
};
