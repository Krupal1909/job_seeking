const express = require("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();
const isAuthorized = require("../Middleware/auth");
router.post("/register", UserController.register); // Assuming register is a method in UserController
router.post("/login", UserController.login); // Assuming login is a method in UserController
router.get("/logout", isAuthorized, UserController.logout);
router.get("/getuser", isAuthorized, UserController.getUser);
module.exports = router;
