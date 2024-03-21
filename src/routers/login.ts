import express from 'express';
import { loginController } from '../controllers/authentication.js';

const router = express.Router();

router.post('/login', loginController)

export default router;