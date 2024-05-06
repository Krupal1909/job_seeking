const express = require("express");
const router = express.Router();
const isAuthorized = require("../Middleware/auth");
const {
  employerGetAllApplications,
  DeleteApplication,
  JobSeekerAllApplications,
  PostApplications,
} = require("../Controllers/applicationController");

router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.get("/JobSeeker/getall", isAuthorized, JobSeekerAllApplications);
router.post("/post", isAuthorized, PostApplications);
router.delete("/delete/:id", isAuthorized, DeleteApplication);
module.exports = router;
