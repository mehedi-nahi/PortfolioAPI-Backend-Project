const express = require ("express");
const userController = require("../controllers/userController");
const middlewares = require("../middlewares/authVerification");
const experienceController = require("../controllers/experienceController");
const educationController = require("../controllers/educationController");

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

// Education
router.post(`/create-education`, educationController.createEducation);
router.get(`/alleducation`, educationController.allEducation);
router.get(`/single-education/:id`, educationController.singleEducation);
router.post(`/update-education/:id`, educationController.updateEducation);
router.delete(`/delete-education/:id`, educationController.deleteEducation);

module.exports = router;