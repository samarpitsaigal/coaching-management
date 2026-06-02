const router = require("express").Router();
const {signup,login} = require("../Controllers/authController");
const { signupValidation, loginValidation } = require("../Middleware/authValidation");


router.post("/signup",signupValidation,signup);
router.post("/login",loginValidation,login);

module.exports = router;