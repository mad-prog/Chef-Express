const userRepository = require("../repositories/userRepository");
const {
  insertUserSchema,
  updateUserSchema,
} = require("../validations/userValidation");
const encryptPassword = require("../utils/encryptPassword");
const { generateWebToken } = require("./jwtService");
const HttpError = require("../utils/httpError");
const ERRORS = require("../utils/constants");

exports.signup = async (user) => {
  const { email, password } = user;
  if (!email || !password) {
    throw new HttpError(400, ERRORS.NO_USER_DATA_PROVIDED);
  }
  try {
    await insertUserSchema.validateAsync(user);
  } catch (error) {
    throw new HttpError(418, ERRORS.INVALID_DATA);
  }

  const encryptedPassword = await encryptPassword(user.password);

  await userRepository.insertUser({
    ...user,
    password: encryptedPassword,
  });
};

exports.login = async (email, password) => {
  if (!email || !password)
    throw new HttpError(400, ERRORS.NO_USER_DATA_PROVIDED);

  const user = await userRepository.findUserWithPasswordByEmail(email);

  if (!user) throw new HttpError(400, ERRORS.INVALID_USER);

  const encryptedPassword = await encryptPassword(password);

  if (encryptedPassword !== user.password) {
    throw new HttpError(400, ERRORS.NO_USER_DATA_PROVIDED);
  }

  const token = generateWebToken(user.id, user.email, user.role);
  //store in local storage, and then use it to go to /me endpoint
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
  console.log(userInfo);
  //TODO this does not function.
  if (!id || !userInfo) throw new HttpError(400, ERRORS.INVALID_DATA);
  const userStored = await userRepository.findUserById(id);

  if (!userStored) throw new HttpError(404, ERRORS.INVALID_USER);

  //only the user (or an admin) can edit user details
  if (userStored.id !== user.id && user.role !== "admin")
    throw new HttpError(401, ERRORS.INVALID_AUTHORIZATION);

  const validatedUser = await updateUserSchema.validateAsync(userInfo);
  if (!validatedUser) throw new HttpError(400, ERRORS.INVALID_DATA);
  await userRepository.updateUser(id, validatedUser);
};
