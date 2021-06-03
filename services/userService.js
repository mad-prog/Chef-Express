const userRepository = require("../repositories/userRepository");

exports.createUser = async (user) => {
  await userRepository.insertUser(user);
};

exports.getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

exports.getUserById = async (id) => {
  return await userRepository.findUserById(id);
};

exports.removeUser = async (id) => {
  return await userRepository.deleteUser(id);
};

exports.editUser = async (id, userInfo) => {
  await userRepository.updateUser(id, userInfo);
};

//if (!user) throw new Error("User not found");
