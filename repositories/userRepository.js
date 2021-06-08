const User = require("../models/User");
const HttpError = require("../utils/httpError");
const ERRORS = require("../utils/constants");

exports.insertUser = async (user) => {
  return await User.create(user);
};

exports.findAllUsers = async () => {
  return await User.findAll();
};

exports.findUserById = async (id) => {
  return await User.findByPk(id);
};

/*
exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
*/

exports.findUserWithPasswordByEmail = async (email) => {
  return await User.scope("withPassword").findOne({ where: { email } });
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError(404, ERRORS.INVALID_USER);
  const destroyedRow = await User.destroy({ where: { id } });
  return destroyedRow;
};

exports.updateUser = async (id, userInfo) => {
  return await User.update(userInfo, { where: { id } });
};
