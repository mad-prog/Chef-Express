const HttpError = require("../utils/httpError");
const ERRORS = require("../utils/constants");

const roleValidation = (role) => {
  const roles = Array.isArray(role) ? role : [role];
  return (req, res, next) => {
    if (![...roles, "admin"].includes(req.user?.role))
      throw new HttpError(401, ERRORS.INVALID_AUTHORIZATION);
    next();
  };
};

module.exports = roleValidation;
