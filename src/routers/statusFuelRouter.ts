import express from 'express';
import { getCountryStatusFuelController } from '../controllers/statusCountryFuel.js';

const router = express.Router();

router.get('/status', getCountryStatusFuelController)

export default router;