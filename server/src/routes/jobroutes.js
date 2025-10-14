const express = require("express");
const {
  getJobs,
  getJobById,
  getJobsByEmail,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/JobController");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.get("/email/:email", getJobsByEmail);
router.post("/jobs", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
