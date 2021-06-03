const userRepository = require("../repositories/userRepository");

exports.createUser = async (user) => {
  await userRepository.insertUser(user);
};

test;
