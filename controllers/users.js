const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { ctrlWrapper, HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: passwordHash });
  res
    .status(201)
    .json({ email: result.email, subscription: result.subscription });
};

const loginIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json(token);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "No Content" });
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res, next) => {
	const {_id} = req.user;
	const {subscription} = req.body;
	if (!subscription) {
	  throw HttpError(400, "Missing field subscription");
	}
	await User.findByIdAndUpdate(_id, {subscription}, {
	  new: true,
	});

	res.status(200).json({subscription});
 };

module.exports = {
  register: ctrlWrapper(register),
  loginIn: ctrlWrapper(loginIn),
  logout: ctrlWrapper(logout),
  currentUser: ctrlWrapper(currentUser),
  updateSubscription: ctrlWrapper(updateSubscription),
};
