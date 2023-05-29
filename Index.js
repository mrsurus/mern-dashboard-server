const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nzh9xhl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const userCollection = client.db('mernDashboard').collection('users')
        const oderCollection = client.db('mernDashboard').collection('oders')
        const messageCollection = client.db('mernDashboard').collection('messages')

        app.post('/users', async (req, res) => {
            const info = req.body;
            const result = await userCollection.insertOne(info)
            res.send(result)
        })
        app.get('/user/:email', async(req, res)=> {
            const email = req.params.email
            const query = {email: email}
            const result = await userCollection.findOne(query)
            res.send(result)
        })

        app.post('/oders', async (req, res) => {
            const info = req.body;
            const result = await oderCollection.insertOne(info)
            res.send(result)
        })

        app.get('/oderget', async(req,res)=> {
            const query = {}
            const result = await oderCollection.find(query).toArray()
            res.send(result)
        })

    }finally{

    }
}
run().catch(err => console.log(err))

app.get('/', async(req,res) => {
    res.send('Mern dashboard server is running on')
})

app.listen(port, async(req, res)=> {
    console.log(`server is running on ${ port}`);
})