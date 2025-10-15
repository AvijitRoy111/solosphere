const express = require("express");
const {
  createBid,
  getMyBids,
  getBidsRequest,
  updateBidStatus,
  deleteBid,
  deleteBidRequest,
} = require("../controllers/BidController");

const router = express.Router();

router.post("/", createBid);
router.get("/my-bids/:email", getMyBids);
router.get("/bids-request/:email", getBidsRequest);
router.delete("/request/:id", deleteBidRequest); 
router.delete("/:id", deleteBid); 
router.patch("/:id", updateBidStatus);

module.exports = router;
