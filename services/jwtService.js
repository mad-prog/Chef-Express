const jwt = require("jsonwebtoken");

const SECRET_KEY = "foodie";

/*
generate web token that bears the user's:
ID --> to check which changes can be made, 
Email -->  to compare for login
Role --> authorise access
*/

exports.generateWebToken = (id, email, role) => {
  console.log(id, email, role);
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

exports.verifyWebToken = (webToken) => {
  return jwt.verify(webToken, SECRET_KEY);
};
