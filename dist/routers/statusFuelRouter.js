import express from 'express';
import { getCountryStatusFuelController } from '../controllers/statusCountryFuel.js';
const router = express.Router({ mergeParams: true });
router.get('/status/:country', getCountryStatusFuelController);
export default router;
//# sourceMappingURL=statusFuelRouter.js.map