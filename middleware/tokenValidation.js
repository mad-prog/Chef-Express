const { verifyWebToken } = require("../services/jwtService");

const tokenValidation = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.slice(7);
    //removes the bearer from token
    const { id, email, role } = verifyWebToken(token);
    //add this object to request to follow through on to the next function
    req.user = { id, email, role };
  }
  next();
};

module.exports = tokenValidation;
