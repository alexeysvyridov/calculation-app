import express from 'express';
import { registerController } from '../controllers/authentication.js';
import { mailController } from '../controllers/mailerController.js';

const router = express.Router();

router.post('/register', registerController, mailController)

export default router;