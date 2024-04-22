const {Sequelize,DataTypes} = require('sequelize');
const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {  registerUser,
    loginUser,currentUser,editUser,viewProfile,viewProfileall, deleteUser,getUserCount, viewProfileById,
    editUserById  } = require("../controllers/userController");

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads'); // Specify the directory where you want to store profile pictures
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, 'profile-' + Date.now() + ext);
        },
    });
    
const upload = multer({ storage: storage });  // Initialize Multer middleware
        

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/current").get(validateToken,currentUser);
router.route("/edit").put(validateToken,upload.single('profilePicture'),editUser);
router.route("/editbyid/:id").put(validateToken,upload.single('profilePicture'), editUserById);
router.route("/viewProfileall").get(validateToken,viewProfileall);
router.route("/viewProfile").get(validateToken,viewProfile);
router.route("/deleteUser/:id").delete(validateToken,deleteUser);
router.route("/viewUserbyid/:id").get(validateToken,viewProfileById);
router.route("/userCount").get(validateToken, getUserCount);
module.exports = router;