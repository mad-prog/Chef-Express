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

exports.deleteUser = async (id) => {
  const user = User.findByPk(id);
  if (!user) throw new Error("User not found");
  const destroyedRow = await User.destroy({ where: { id } });
  return destroyedRow;
};

exports.updateUser = async (id, userInfo) => {
  return await User.update(userInfo, { where: { id } });
};
