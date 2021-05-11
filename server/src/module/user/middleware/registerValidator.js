const { body, validationResult } = require("express-validator");

const registerValidatorRules = [
  body("email").trim().isEmail().withMessage("You have to enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 20 })
    .withMessage("Password must have between 5 and 20 characters"),
  body("name")
    .trim()
    .isLength({ min: 3 })
    .isLength({ max: 15 })
    .withMessage("Name must have between 5 and 15 characters"),
];

module.exports = registerValidatorRules;
