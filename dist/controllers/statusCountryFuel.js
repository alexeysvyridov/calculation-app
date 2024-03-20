import { goToPrices as scrapFuelInfo } from '../puppeteer/index.js';
export const getCountryStatusFuelController = async (req, res) => {
    try {
        const params = req.params;
        console.log('query', params);
        console.log('params', req.params);
        const data = await scrapFuelInfo(params.country);
        res.status(200).send({ statusCode: 200, data });
    }
    catch (error) {
        console.log('error', error);
        res.status(400);
    }
};
//# sourceMappingURL=statusCountryFuel.js.map