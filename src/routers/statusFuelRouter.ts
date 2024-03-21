import express from 'express';
import { getCountryStatusFuelController } from '../controllers/statusCountryFuel.js';

const router = express.Router();

router.get('/status', getCountryStatusFuelController)
// router.get('/setCookie', async (req, res) => {
//   try {
//     res.cookie('name_cookie', '123');

//     return res.send(200)
//   } catch (error) {
//     res.status(400)
//   }
// })
// router.get('/getCookie', async (req, res) => {
//   try {
//     return res.status(200).json({data: req.cookies})
//   } catch (error) {
//     res.status(400)
//   }
// })

export default router;