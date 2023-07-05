const express = require("express");
const { ctrlUser } = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../models");
const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrlUser.register);
router.post('/login', validateBody(loginSchema), ctrlUser.loginIn);
router.post('/logout', authenticate, ctrlUser.logout);
router.get('/curren', authenticate, ctrlUser.currentUser);

module.exports = router;
