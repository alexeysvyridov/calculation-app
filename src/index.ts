import express, { RequestHandler, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import statusFuelRouter from './routers/statusFuelRouter.js';
import cookieParser from 'cookie-parser'; 
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/v1', statusFuelRouter);
const { MongoClient, ServerApiVersion } = mongodb;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
dotenv.config();

const client = new MongoClient(process.env.PROJECT, {
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running', port);
});