const express = require('express')
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 5000

// use middleware 
app.use(cors())
app.use(express.json())
require('dotenv').config()

// console.log(process.env.USER_NAME)
// console.log(process.env.USER_PASS)













async function run() {

  try {
    const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.hcgdznz.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    
  const productsCollection = client.db("khaasFoodDatabase").collection("allProducts")  
  const categoriNameCollection = client.db("khaasFoodDatabase").collection("categorisName")
  const blogCollection = client.db("khaasFoodDatabase").collection('Blog')
  
  

  app.get("/allFoods", async (req, res) => {
     const filter = {}
     const foodsCategoris  = await productsCollection.find(filter).project({categori: 1}).toArray()
     res.send(foodsCategoris)
  })


  app.get("/categorisName", async(req, res)=> {
    const query = {}
    const name = await categoriNameCollection.find(query).toArray()
    console.log(name)
    res.send(name)
  })

  // click name then specic data show 
  app.get("/clikName/:id", async (req, res) => {
      const name = req.params.id
      const filter = {categori: name}
      const result = await productsCollection.find(filter).toArray()
      res.send(result)
  })

// Fruits 
  app.get("/homeFruits", async (req, res ) => {
     const filter = {categori: "FRUITS"}
     const fruits = await productsCollection.find(filter).limit(4).toArray()
     res.send(fruits)
  })


  app.get("/FruitsAll", async (req, res ) => {
    const filter = {categori: "FRUITS"}
    const fruits = await productsCollection.find(filter).toArray()
    res.send(fruits)
 })


 app.get("/fruits/:id", async (req, res )=> {
   const id = req.params.id
   const filter= {_id: new ObjectId(id)}
   console.log(filter)
   const singleFruit= await productsCollection.findOne(filter)
   res.send(singleFruit)
 })







  // Fish 
  app.get("/homeFish", async (req, res ) => {
     const filter= {categori: "FISH"}
     const fish = await productsCollection.find(filter).limit(4).toArray()
     res.send(fish)
  })

  app.get("/FishAll", async (req, res ) => {
    const filter= {categori: "FISH"}
    const fish = await productsCollection.find(filter).toArray()
    res.send(fish)
 })




  // HONEY 
  app.get("/homeHoney", async (req, res ) => {
    const filter = { categori: "HONEY"}
    const honey = await productsCollection.find(filter).limit(4).toArray()
    res.send(honey)
  })


  app.get("/honeyAll", async (req, res ) => {
    const filter = { categori: "HONEY"}
    const honey = await productsCollection.find(filter).toArray()
    res.send(honey)
  })





  // MEAT 
  app.get('/homeMeat', async (req, res ) => {
     const filter = { categori: "MEAT"}
     const meat = await productsCollection.find(filter).limit(4).toArray()
     res.send(meat)
  })


  app.get('/MeatSee', async (req, res ) => {
    const filter = { categori: "MEAT"}
    const meat = await productsCollection.find(filter).toArray()
    res.send(meat)
 })




  // Blog 
  app.get('/blogImage', async (req, res ) => {
     const filter = {}
     const blog = await blogCollection.find(filter).toArray()
     res.send(blog)
  })

  














  } finally {


  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Khaas Food App server on port ${port}`)
})


