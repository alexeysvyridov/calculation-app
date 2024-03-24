import { Request, Response } from "express";
import { goToPrices as scrapFuelInfo } from '../puppeteer/index.js';
import currencyApi from '@everapi/currencyapi-js';

const hour = 60 * 1000;
export const getCountryStatusFuelController = async (req: Request, res: Response) => {
  try {
    const query = req.query as {country: string, currency: string}

    if(!!req.cookies.country) {
     return res.status(200).send({statusCode:200, data: req.cookies})
    }
    const client = new currencyApi(process.env.CURRENCY_API_KEY)
    const responseCurrency = await client.latest({
      base_currency:'USD',
      currencies:  "ILS"
    })
    
    const fuelList = await scrapFuelInfo(query.country);
    res.cookie('country', {data: {fuelList, currency: responseCurrency}}, { maxAge: hour })

    res.status(200).send({data: {fuelList, ...responseCurrency}})
  } catch (error) {
    console.log('error', error);
    res.status(400);
  }
}