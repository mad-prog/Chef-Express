const User = require("../models/User");

exports.insertUser = async (user) => {
  return await User.create(user);
};
