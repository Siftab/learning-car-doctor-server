const express = require('express');
const cors = require('cors');
const cookieParser= require('cookie-parser')
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
// MiddleWear
app.use(cors({
  origin:['http://localhost:5173'],
   credentials:true}))
app.use(express.json())
app.use(cookieParser())


// code part


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i7jrqrv.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();
    const carServices=client.db("car-doctor").collection("services");
    const carBookings=client.db("car-doctor").collection("bookings");



    // Auth data
    app.post('/jwt',async(req,res)=>{
      const user = req.body;
      console.log(user,process.env.SECRET_TOKEN)
      const token= jwt.sign(user,process.env.SECRET_TOKEN,{expiresIn:'1h'})
      
      res
      .cookie('token',token,{
        httpOnly:true,
        secure:false
        
      })
      .send({success:true})
    })
// get all service data 

    app.get('/services',async(req,res)=>{
      const result =await carServices.find().toArray();
      res.send(result)
    })
// get single services data
app.get('/services/:id',async(req,res)=>{
  const id = req.params.id;
  const filter= {
    _id: new ObjectId(id)
  }

  const options = {
    
    // Include only the `title` and `imdb` fields in the returned document
    projection: {  title: 1, price:1,description:1,img:1 },
  };
  const result=await carServices.findOne(filter,options)
  res.send(result)
})

  // Bookings
  app.get('/bookings',async(req,res)=>{
    console.log('tokennnnn',req.cookies.token)
   
    let query={};
    if(req.query?.email){
      query={email: req.query.email}
    }
    const result = await carBookings.find(query).toArray();
    res.send(result)
  })
  
  app.patch('/bookings/:id',async(req,res)=>{
     const id=req.params.id;
     const newdata = req.body;
     const query= {
      _id: new ObjectId(id)
     }
     const updatedInfo={
      $set:{
        status: newdata.status
      }
     }
     const result=await carBookings.updateOne(query,updatedInfo)
    // console.log(id ,newdata)
    res.send(result)
  })
  app.delete('/bookings/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {
      _id: new ObjectId(id)
    }
    const result=await  carBookings.deleteOne(query)
    res.send(result)
  })


  app.post('/bookings', async(req,res)=>{
    const newBooking = req.body;
    // console.log(newBooking)
    const result =await carBookings.insertOne(newBooking);
    res.send(result)
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send("your doctor is on the Way")
})
app.listen(port,()=>{
    console.log(`doctor in ${port} port now`)
})