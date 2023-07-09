const express = require("express");
const { ctrlUser } = require("../../controllers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { registerSchema, loginSchema, updateSubscriptionSchema } = require("../../models");
const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrlUser.register);
router.post('/login', validateBody(loginSchema), ctrlUser.loginIn);
router.post('/logout', authenticate, ctrlUser.logout);
router.get('/curren', authenticate, ctrlUser.currentUser);
router.patch('/', authenticate, validateBody(updateSubscriptionSchema), ctrlUser.updateSubscription);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlUser.updateAvatar)

module.exports = router;
