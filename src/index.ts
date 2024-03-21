import express, { RequestHandler, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import statusFuelRouter from './routers/statusFuelRouter.js';
import cookieParser from 'cookie-parser'; 
import bodyParser from 'body-parser';
import registerRouter from './routers/register.js'
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/auth', registerRouter);
app.use('/api/v1', statusFuelRouter);

dotenv.config();

mongoose.connect(process.env.PROJECT);
mongoose.connection.on('error', (error: Error) => console.log(error))
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running', port);
});