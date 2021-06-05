const userRepository = require("../repositories/userRepository");
const {
  insertUserSchema,
  updateUserSchema,
} = require("../validations/userValidation");
const encryptPassword = require("../utils/encryptPassword");
const { generateWebToken } = require("./jwtService");

exports.signup = async (user) => {
  const validatedUser = await insertUserSchema.validateAsync(user);
  if (!validatedUser)
    throw new Error("You must provide a valid email and a strong password");
  const encryptedPassword = await encryptPassword(validatedUser.password);

  await userRepository.insertUser({
    ...validatedUser,
    password: encryptedPassword,
  });
};

exports.login = async (email, password) => {
  if (!email || !password)
    throw new Error("You must enter a valid email and password");

  const user = await userRepository.findUserWithPasswordByEmail(email);

  if (!user) throw new Error("User not found");

  const encryptedPassword = await encryptPassword(password);

  if (encryptedPassword !== user.password) {
    throw new Error("Please enter correct email and password");
  }

  const token = generateWebToken(user.id, user.email, user.role);
  console.log(token);
  return token;
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

exports.editUser = async (user, id, userInfo) => {
  if (!id || !userInfo) throw new Error("Incomplete information");
  const userStored = await userRepository.findUserById(id);

  if (!userStored) throw new Error("No user found");

  //only the user (or an admin) can edit user details
  if (userStored.id !== user.id && user.role !== "admin")
    throw new Error("You aren't authorised to change this");

  const validatedUser = await updateUserSchema.validateAsync(userInfo);
  if (!validatedUser) throw new Error("You must provide valid info");
  await userRepository.updateUser(id, validatedUser);
};
