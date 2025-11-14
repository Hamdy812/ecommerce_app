const express = require("express");
const {deleteLoggedUserData,updateuserdata, updateuserpassword,getmydata,addUser, getallUsers,getoneUser,updateUser ,deleteUser,changeUserPassword} = require("../controllers/user");
const router = express.Router();
const { updateLoggedUserValidator,getUserValidator,createUserValidator,updateUserValidator,deleteUserValidator ,changepasswordUserValidator} = require('../validators/uservalidator');
const Auth=require('../controllers/authuser')

router.use(Auth.protect,Auth.allowedTo('admin','manger'),)

router.route('/changepassword/:id')
.put(changepasswordUserValidator,changeUserPassword)

router.route("/")
.get(getallUsers)
.post(createUserValidator,addUser);


router.get('/getme',Auth.protect,getmydata,getoneUser)
router.put('/changemypassword',Auth.protect,updateuserpassword,getoneUser)
router.put('/changemydata',Auth.protect,updateLoggedUserValidator,updateuserdata,getoneUser)
router.delete('/deletemydata',Auth.protect,deleteLoggedUserData,getoneUser)

router.route('/:id')
.get( getUserValidator,getoneUser)
.put(updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser)

module.exports = router;
