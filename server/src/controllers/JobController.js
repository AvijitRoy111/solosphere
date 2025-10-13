const client = require("../helper/client");

const jobsCollection = client.db("solosphere").collection("jobs");

const getJobs = async (req, res, next) => {
  const result = await jobsCollection.find().toArray();
  //res.send(result);
  //res.status(200).json({ message: "all jobs", data:result})
  const name = "avi"
  if(name !="avi"){
     res.status(400).json({
         success: false,
         message: "name is wrong"
     })
  }
  next()
}


const goniJob = async (req, res) => {
  res.status(200).json({
         message: "Goni Job"
  })
}

module.exports = { getJobs, goniJob }