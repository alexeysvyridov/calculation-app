import { Request, Response } from "express";
import { goToPrices as scrapFuelInfo } from '../puppeteer/index.js';
const hour = 60 * 1000;
export const getCountryStatusFuelController = async (req: Request, res: Response) => {
  try {
    const query = req.query as {country: string, currency: string}

    if(!!req.cookies.country) {
     return res.status(200).send({statusCode:200, data: req.cookies})
    }
    const data = await scrapFuelInfo(query.country);
   
    res.cookie('country', data, { maxAge: hour })
    res.status(200).send({statusCode:200, data: data})
  } catch (error) {
    console.log('error', error);
    res.status(400);
  }
}