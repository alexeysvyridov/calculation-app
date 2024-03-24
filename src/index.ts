import express, { RequestHandler, Request, Response } from 'express';
import dotenv from 'dotenv';
import statusFuelRouter from './routers/statusFuelRouter.js';
import cookieParser from 'cookie-parser'; 
import bodyParser from 'body-parser';
import registerRouter from './routers/register.js'
import loginRouter from './routers/login.js'
import checkRouter from './routers/checkRouter.js'
import checkCurrencyExchange from './routers/checkCurrencyExchange.js'
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/auth', registerRouter);
app.use('/auth', loginRouter);
app.use('/api/v1', statusFuelRouter);
app.use('/api/v1', checkRouter);
app.use('/api/v1', checkCurrencyExchange);

dotenv.config();

mongoose.connect(process.env.PROJECT);
mongoose.connection.on('error', (error: Error) => console.log(error))
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running', port);
});