const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const client = require("./src/helper/client");

const jobRoutes = require("./src/routes/jobroutes");
const bidRoutes = require("./src/routes/bidroutes");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ----------- JWT VERIFY -----------
const verify = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "Unauthorized (no token)" });

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// ----------- JWT CREATE -----------
app.post("/jwt", async (req, res) => {
  const user = req.body;
  if (!user?.email)
    return res.status(400).send({ success: false, message: "Email required" });

  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "365d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  }).send({ success: true });
});

// ----------- LOGOUT -----------
app.get("/log-out", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 0,
  }).send({ success: true });
});

// ----------- ROUTES -----------
app.use("/jobs", jobRoutes);
app.use("/bids", bidRoutes);

// ----------- ROOT -----------
app.get("/", async (req, res) => {
  await client.db("admin").command({ ping: 1 });
  res.send("Solosphere Server is running!");
});

// ----------- 404 -----------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ----------- SERVER RUN -----------
app.listen(port, () => console.log(`solosphere Server running on port ${port}`));
