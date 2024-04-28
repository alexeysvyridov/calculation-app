import { Request, Response } from "express";
import currencyApi from '@everapi/currencyapi-js';
// https://app.currencyapi.com/dashboard
const client = new currencyApi(process.env.CURRENCY_API_KEY)
 const currencyController = async (req: Request, res: Response) => {
  try {
    const {fromCurrency, toCurrency} = req.query as {fromCurrency: string, toCurrency: string}

    const response = await client.latest({
      base_currency:fromCurrency || 'USD',
      currencies: toCurrency || 'EUR'
    })
    res.status(200).json({data: response})
  } catch (error) {
    res.status(400).json({message: error})
  }
}

export {currencyController}