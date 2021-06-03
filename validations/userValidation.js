const Joi = require("joi");

exports.insertUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .required(),
  //min 1 lowercase, min 1 uppercase, min 1 numeric, min 1 special character, min 8 characters long
  name: Joi.string().required(),
});

exports.updateUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().regex(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  ),
  //min 1 lowercase, min 1 uppercase, min 1 numeric, min 1 special character, min 8 characters long
  name: Joi.string(),
});
