const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
     origin:['http://localhost:5173', 'http://localhost:5174'],
     Credentials:true,
     optionSuccessStatus:200,
}
// midileware........
app.use(cors(corsOptions))
app.use(express.json())


console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tkbsmtm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();
     const jodsCollection = client.db('solosphere').collection('jobs') 
     const bidsCollection = client.db('solosphere').collection('bids') 



     // show jobs from mongodb..
     app.get('/jobs', async(req, res) =>{
          const query = jodsCollection.find()
          const result = await query.toArray()
          res.send(result)
     })

     // show single job from mongodb..
     app.get('/job/:id', async(req, res) =>{
          const id = req.params.id;
          const query = {_id : new ObjectId(id)};
          const result = await jodsCollection.findOne(query);
          res.send(result)
     })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
     res.send('solosphere server is running port is 5000')
})

app.listen(port, () =>{ 
     console.log(`solosphere server running is port ${port}!`)
})