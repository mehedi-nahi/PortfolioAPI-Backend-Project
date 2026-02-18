const express = require ("express");
const userController = require("../controllers/UserController.js");
const middlewares = require("../middlewares/authVerification");

let router = express.Router();


router.post(`/register`, userController.register);
router.post(`/login`, userController.login);
router.get(`/user`, middlewares, userController.user);
router.get(`/logout`, middlewares, userController.logout);


module.exports = router;