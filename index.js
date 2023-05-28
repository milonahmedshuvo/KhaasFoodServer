const express = require('express')
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
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


