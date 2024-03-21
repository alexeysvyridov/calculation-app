import express from 'express';
import { getCountryStatusFuelController } from '../controllers/statusCountryFuel.js';
import { isAuthenticated } from '../middleware/index.js';

const router = express.Router();

router.get('/status', isAuthenticated, getCountryStatusFuelController)

export default router;