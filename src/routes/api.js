const express = require ("express");
const userController = require("../controllers/userController");
const middlewares = require("../middlewares/authVerification");
const experienceController = require("../controllers/experienceController");
const educationController = require("../controllers/educationController");
const advantageController = require("../controllers/advantageController.js");
const portfolioController = require("../controllers/portfolioController.js");

let router = express.Router();

// User
router.post(`/register`, userController.register);
router.post(`/login`, userController.login);
router.get(`/user`, middlewares, userController.user);
router.get(`/logout`, middlewares, userController.logout);
router.post(`/update`, middlewares, userController.update);

// Experience
router.post(`/create-experience`, middlewares, experienceController.createExperience);
router.get(`/allexperience`, experienceController.allExperience);
router.get(`/single-experience/:id`, experienceController.allExperience);
router.post(`/update-experience/:id`, middlewares , experienceController.updateExperience);
router.delete(`/delete-experience/:id`,middlewares, experienceController.deleteExperience);

// Education
router.post(`/create-education`, middlewares, educationController.createEducation);
router.get(`/alleducation`, educationController.allEducation);
router.get(`/single-education/:id`, educationController.singleEducation);
router.post(`/update-education/:id`,middlewares, educationController.updateEducation);
router.delete(`/delete-education/:id`, middlewares, educationController.deleteEducation);

// Advantage
router.post(`/create-advantage`, middlewares, advantageController.createAdvantage);
router.get(`/alladvantage`, advantageController.allAdvantage);
router.get(`/single-advantage/:id`, advantageController.singleAdvantage);
router.post(`/update-advantage/:id`,middlewares, advantageController.updateAdvantage);
router.delete(`/delete-advantage/:id`, middlewares, advantageController.deleteAdvantage);

// Portfolio
router.post(`/create-portfolio`, middlewares, portfolioController.createPortfolio);
router.get(`/allportfolio`, portfolioController.allPortfolio);
router.get(`/single-portfolio/:id`, portfolioController.singlePortfolio);
router.post(`/update-portfolio/:id`,middlewares, portfolioController.updatePortfolio);
router.delete(`/delete-portfolio/:id`, middlewares, portfolioController.deletePortfolio);

module.exports = router;