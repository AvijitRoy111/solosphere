const { ObjectId } = require("mongodb");
const client = require("../helper/client");

const bidsCollection = client.db("solosphere").collection("bids");

// 1. Create Bid
const createBid = async (req, res) => {
  const reqBody = req.body;
  if (!reqBody.name) {
    return res.status(400).json({
      success: false,
      message: "name is required",
    });
  }
  const result = await bidsCollection.insertOne(reqBody);
  res.status(201).json({ success: true, message: "Bid created", data: result });
};

// 2. Get My Bids
const getMyBids = async (req, res) => {
  const email = req.params.email;
  const bids = await bidsCollection.find({ email }).toArray();
  res.status(200).json({ success: true, data: bids });
};

// 3. Get Bids Request (for Buyer)
const getBidsRequest = async (req, res) => {
  const email = req.params.email;
  const bids = await bidsCollection.find({ "buyer.buyer_email": email }).toArray();
  res.status(200).json({ success: true, data: bids });
};

// 4. Update Bid Status
const updateBidStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const result = await bidsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );
  res.status(200).json({ success: true, message: "Status updated", data: result });
};
// 6. Delete bid
const deleteBid = async (req, res) => {
  const id = req.params.id;
  const result = await bidsCollection.deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ success: true, message: "bid deleted", data: result });
};

module.exports = {
  createBid,
  getMyBids,
  getBidsRequest,
  updateBidStatus,
  deleteBid
};
