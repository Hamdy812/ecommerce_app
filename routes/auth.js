const express = require("express");
const { signup,login,forgetpassword,verifyPassResetCode,resetPassword} = require("../controllers/authuser");
const router = express.Router();
const { signupValidator,loginValidator} = require('../validators//authvalidator');


router.route("/signup")
.post(signupValidator,signup);
router.route("/login")
.post(loginValidator,login);
router.route("/forgotpassword")
.post(forgetpassword);
router.route("/verifypassword")
.post(verifyPassResetCode);
router.route("/verifypassword")
.post(resetPassword);




// router.route('/:id')
// .get( getUserValidator,getoneUser)
// .put(updateUserValidator,updateUser)
// .delete(deleteUserValidator,deleteUser)

module.exports = router;
