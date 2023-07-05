const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const { EMAIL_REGEX } = require("../constants");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: [true, "Duplicated email"],
      match: EMAIL_REGEX,
      required: true,
    },
    phone: {
      type: String,
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
		required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),

  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {
  Contact,
  addJoiSchema,
  updateFavoriteJoiSchema,
};
