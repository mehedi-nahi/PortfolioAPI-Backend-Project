const express = require ("express");
const userController = require("../controllers/userController");
const middlewares = require("../middlewares/authVerification");
const experienceController = require("../controllers/experienceController");
const educationController = require("../controllers/educationController");
const advantageController = require("../controllers/advantageController.js");
const portfolioController = require("../controllers/portfolioController.js");
const serviceController = require("../controllers/serviceController.js");
const contactController = require("../controllers/contactController.js");
const blogController = require("../controllers/blogController.js");
const commentController = require("../controllers/commentController.js");
const fileUploads = require("../middlewares/fileUploads.js");

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

// Service
router.post(`/create-service`, middlewares, serviceController.createService);
router.get(`/allservice`, serviceController.allService);
router.get(`/single-service/:id`, serviceController.singleService);
router.post(`/update-service/:id`,middlewares, serviceController.updateService);
router.delete(`/delete-service/:id`, middlewares, serviceController.deleteService);

// Message
router.post(`/create-contact`,  contactController.createContact);
router.get(`/allcontact`, contactController.allContact);
router.get(`/single-contact/:id`, contactController.singleContact);
router.delete(`/delete-contact/:id`, contactController.deleteContact);

// Blog
router.post(`/create-blog`, middlewares, blogController.createBlog);
router.get(`/allblog/:pageNo/:perPage`, blogController.allBlog);
router.post(`/update-blog/:id`,middlewares, blogController.updateBlog);
router.delete(`/delete-blog/:id`, middlewares, blogController.deleteBlog);
router.get(`/single-blog/:id`, blogController.singleBlog);

 // Comment
router.post(`/create-comment`, commentController.createComment);
router.get(`/allcomment`, commentController.allComment);
router.get(`/single-comment/:id`, commentController.singleComment);
router.delete(`/delete-comment/:id`, middlewares, commentController.deleteComment);

// file upload
router.post (`/file-upload`,middlewares,fileUploads.single("file"), userController.upload);

module.exports = router;