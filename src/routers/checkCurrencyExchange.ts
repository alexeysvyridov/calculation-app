import { Router } from "express";
import { isAuthenticated } from "../middleware/index.js";

import { currencyController } from "../controllers/currencyController.js";


const router = Router();

router.get('/currency',isAuthenticated, currencyController)
export default router;