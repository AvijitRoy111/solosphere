const express = require("express");
const {
  createBid,
  getMyBids,
  getBidsRequest,
  updateBidStatus,
} = require("../controllers/BidController");

const router = express.Router();

router.post("/", createBid);
router.get("/my-bids/:email", getMyBids);
router.get("/bids-request/:email", getBidsRequest);
router.patch("/:id", updateBidStatus);

module.exports = router;
