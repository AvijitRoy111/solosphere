const client = require("../helper/client");

const bidsCollection = client.db("solosphere").collection("bids");

const createBid = async (req, res) => {
     const reqBody = req.body;
     if(!reqBody.name){
        res.status(400).json({
          success: false,
          message: "name is required"
        })
     }
     res.status(200).json({
          message:"Request Body",
          data: req.body
     })
}


module.exports= { createBid }