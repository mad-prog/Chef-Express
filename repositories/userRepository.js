const User = require("../models/User");

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
  const user = User.findByPk(id);
  if (!user) throw new Error("User not found");
  const destroyedRow = await User.destroy({ where: { id } });
  return destroyedRow;
};

exports.updateUser = async (id, userInfo) => {
  return await User.update(userInfo, { where: { id } });
};
