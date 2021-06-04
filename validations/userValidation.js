const Joi = require("joi");

exports.insertUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  //min 1 lowercase, min 1 uppercase, min 1 numeric, min 1 special character, min 8 characters long
  name: Joi.string().required(),
});

exports.updateUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  name: Joi.string(),
});
