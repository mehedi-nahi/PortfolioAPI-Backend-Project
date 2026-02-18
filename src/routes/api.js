const express = require ("express");
const userController = require("../controllers/UserController.js");
const middlewares = require("../middlewares/authVerification");
const experienceController = require("../controllers/ExperienceController.js");

let router = express.Router();

// User
router.post(`/register`, userController.register);
router.post(`/login`, userController.login);
router.get(`/user`, middlewares, userController.user);
router.get(`/logout`, middlewares, userController.logout);
router.post(`/update`, middlewares, userController.update);

// Experience
router.post(`/create-experience`, experienceController.createExperience);
router.get(`/allexperience`, experienceController.allExperience);
router.get(`/single-experience/:id`, experienceController.allExperience);
router.post(`/update-experience/:id`, experienceController.updateExperience);
router.delete(`/delete-experience/:id`, experienceController.deleteExperience);

module.exports = router;