const { Contact, addJoiSchema, updateFavoriteJoiSchema } = require("./contact");
const {registerSchema, User, loginSchema } = require("./user")

module.exports = {
  Contact,
  addJoiSchema,
  updateFavoriteJoiSchema,
  User,
  registerSchema,
  loginSchema,
};