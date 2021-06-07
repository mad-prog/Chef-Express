const nodemailer = require("nodemailer");
const { promisify } = require("util");

const createTestAccount = promisify(nodemailer.createTestAccount);

const { NODE_ENV } = process.env;

const loadProdConfig = () => {
  const { MAIL_USER, MAIL_PASSWORD, MAIL_HOST, MAIL_SECURE, NODE_ENV } =
    process.env;
  const secure = MAIL_SECURE == true;
  return {
    host: MAIL_HOST,
    port: 587,
    secure,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  };
};

const loadTestConfig = async () => {
  const account = await createTestAccount();
  return {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  };
};

const loadConfig = async () => {
  if (NODE_ENV === "production") return loadProdConfig();
  return await loadTestConfig();
};

module.exports = loadConfig;
