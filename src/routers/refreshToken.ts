import { Router } from "express";
import { refreshTokenController } from "../controllers/refreshToken.js";

const routes = Router();

routes.post('/refreshToken', refreshTokenController)

export default routes;