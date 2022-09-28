const userController = require("../controllers/user");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.post("/signup", userController.addUser);
router.post("/login", userController.loginUser);
router.get("/me",auth,userController.currentUser)

module.exports = router;
