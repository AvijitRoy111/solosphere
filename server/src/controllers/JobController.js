const { ObjectId } = require("mongodb");
const client = require("../helper/client");

const jobsCollection = client.db("solosphere").collection("jobs");

// 1. Get All Jobs
const getJobs = async (req, res) => {
  const jobs = await jobsCollection.find().toArray();
  res.status(200).json({ success: true, message: "All Jobs", data: jobs });
};

// 2. Get Single Job
const getJobById = async (req, res) => {
  const id = req.params.id;
  const result = await jobsCollection.findOne({ _id: new ObjectId(id) });
  res.status(200).json({ success: true, data: result });
};

// 3. Get Jobs by Buyer Email
const getJobsByEmail = async (req, res) => {
  const email = req.params.email;
  const jobs = await jobsCollection.find({ "buyer.email": email }).toArray();
  res.status(200).json({ success: true, data: jobs });
};

// 4. Create Job
const createJob = async (req, res) => {
  const jobData = req.body;
  console.log(jobData)
  const result = await jobsCollection.insertOne(jobData);
  res.status(201).json({ success: true, message: "Job created", data: result });
};

// 5. Update Job
const updateJob = async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;
  const result = await jobsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: jobData }
  );
  res.status(200).json({ success: true, message: "Job updated", data: result });
};

// 6. Delete Job
const deleteJob = async (req, res) => {
  const id = req.params.id;
  const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ success: true, message: "Job deleted", data: result });
};

module.exports = {
  getJobs,
  getJobById,
  getJobsByEmail,
  createJob,
  updateJob,
  deleteJob,
};
