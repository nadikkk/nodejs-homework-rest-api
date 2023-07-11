const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
const { EMAIL_REGEX, PASSWD_REGEX, subscriptionEnum } = require("../constants");

const userSchema = new Schema(
  {
    password: {
      type: String,
      match: PASSWD_REGEX,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: EMAIL_REGEX,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(subscriptionEnum),
      default: subscriptionEnum.starter,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
	 verify: {
		type: Boolean,
		default: false,
	 },
	 verificationToken: {
		type: String,
		required: [true, 'Verify token is required'],
	 },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  subscription: Joi.string().valid(...Object.values(subscriptionEnum)),
});

const verifyEmailShema = Joi.object({
	email: Joi.string()
	  .email({ minDomainSegments: 2, tlds: { allow: false } })
	  .required(),
 });

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...Object.values(subscriptionEnum)),
});

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  verifyEmailShema,
};
