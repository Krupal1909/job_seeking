const express = require("express");
const JobController = require("../Controllers/JobController");
const isAuthorized = require("../Middleware/auth");
const router = express.Router();

router.get("/getall", JobController.getAllJobs);
router.get("/getmyjobs", isAuthorized, JobController.getmyJobs);
router.get("/:id", isAuthorized, JobController.getSingleJob);
router.post("/post", isAuthorized, JobController.postJob);
router.put("/update/:id", isAuthorized, JobController.updateJob);
router.delete("/delete/:id", isAuthorized, JobController.deleteJob);

module.exports = router;
