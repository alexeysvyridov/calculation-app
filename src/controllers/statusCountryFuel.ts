import { Request, Response } from "express";
import { goToPrices as scrapFuelInfo } from '../puppeteer/index.js';

export const getCountryStatusFuelController = async (req: Request, res: Response) => {
  try {
    const query = req.query as {country: string, currency: string}
    const data = await scrapFuelInfo(query.country);
    res.status(200).send({statusCode:200, data})
  } catch (error) {
    console.log('error', error);
    res.status(400);
  }
}