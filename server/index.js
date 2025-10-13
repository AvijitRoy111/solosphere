const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getJobs, goniJob } = require("./src/controllers/JobController");
const client = require("./src/helper/client");
const { createBid } = require("./src/controllers/BidController");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ---------- JWT VERIFY MIDDLEWARE ----------
const verify = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access (No Token)" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access (Invalid Token)" });
    }
    req.user = decoded;
    next();
  });
};


async function run() {
  try {
    // const jobsCollection = client.db("solosphere").collection("jobs");
    // const bidsCollection = client.db("solosphere").collection("bids");

    // // ---------- JWT GENERATE ----------
    // app.post("/jwt", async (req, res) => {
    //   const user = req.body;
    //   if (!user?.email) {
    //     return res.status(400).send({ success: false, message: "Email is required" });
    //   }
    //   const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "365d" });
    //   res
    //     .cookie("token", token, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production", // true in prod
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    //     })
    //     .send({ success: true });
    // });

    // ---------- LOGOUT ----------
    // app.get("/log-out", async (req, res) => {
    //   res
    //     .clearCookie("token", {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    //       maxAge: 0,
    //     })
    //     .send({ success: true });
    // });

    // ---------- PUBLIC ROUTES ----------


    // app.get("/job/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await jobsCollection.findOne(query);
    //   res.send(result);
    // });

    // ---------- PRIVATE ROUTES (SECURED) ----------

    // 1. My Posted Jobs (only job owner can see)
    // app.get("/jobs/:email", verify, async (req, res) => {
    //   const tokenEmail = req.user.email;
    //   const email = req.params.email;
    //   if (tokenEmail !== email) {
    //     return res.status(403).send({ message: "Forbidden access" });
    //   }
    //   const query = { "buyer.email": email };
    //   const result = await jobsCollection.find(query).toArray();
    //   res.send(result);
    // });

    // 2. Post a Job
    // app.post("/jobs", verify, async (req, res) => {
    //   const jobData = req.body;
    //   if (req.user.email !== jobData?.buyer?.email) {
    //     return res.status(403).send({ message: "Forbidden access" });
    //   }
    //   const result = await jobsCollection.insertOne(jobData);
    //   res.send(result);
    // });

    // 3. Delete My Posted Job
    // app.delete("/jobs/:id", verify, async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await jobsCollection.deleteOne(query);
    //   res.send(result);
    // });

    // // 4. Update My Posted Job
    // app.put("/jobs/:id", verify, async (req, res) => {
    //   const id = req.params.id;
    //   const jobData = req.body;
    //   const query = { _id: new ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateData = {
    //     $set: { ...jobData },
    //   };
    //   const result = await jobsCollection.updateOne(query, updateData, options);
    //   res.send(result);
    // });

    // // 5. Place a Bid
    // app.post("/bids", verify, async (req, res) => {
    //   const data = req.body;
    //   if (req.user.email !== data?.email) {
    //     return res.status(403).send({ message: "Forbidden access" });
    //   }
    //   const result = await bidsCollection.insertOne(data);
    //   res.send(result);
    // });

    // // 6. My Bids
    // app.get("/my-bids/:email", verify, async (req, res) => {
    //   const tokenEmail = req.user.email;
    //   const email = req.params.email;
    //   if (tokenEmail !== email) {
    //     return res.status(403).send({ message: "Forbidden access" });
    //   }
    //   const query = { email: email };
    //   const result = await bidsCollection.find(query).toArray();
    //   res.send(result);
    // });

    // // 7. Bids Request (jobs owner can see who bid)
    // app.get("/bids-request/:email", verify, async (req, res) => {
    //   const tokenEmail = req.user.email;
    //   const email = req.params.email;
    //   if (tokenEmail !== email) {
    //     return res.status(403).send({ message: "Forbidden access" });
    //   }
    //   const query = { "buyer.buyer_email": email };
    //   const result = await bidsCollection.find(query).toArray();
    //   res.send(result);
    // });

    // // 8. Update Bid Status
    // app.patch("/bids/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const { status } = req.body;
    //   const query = { _id: new ObjectId(id) };
    //   const updateStatus = { $set: { status } };
    //   const result = await bidsCollection.updateOne(query, updateStatus);
    //   res.send(result);
    // });

    // ---------- MONGO PING ----------
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Connected!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// ---------- ROOT ----------
app.get("/", async (req, res) => {
  await client.db("admin").command({ ping: 1 });
  res.send("solosphere server is running!");
});

app.get("/jobs", getJobs, goniJob);

//app.get("/route", "function1", "function2", "function3")

app.post("/create-bid", createBid)

app.use((req, res, next)=> {
  res.status(404).json({
    success:  false,
    message: "route not found"
  })

  next()
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
