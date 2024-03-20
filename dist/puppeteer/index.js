import puppeteer from "puppeteer";
import { mergeArrays } from "../utils/index.js";
const goToPrices = async (country = 'israel') => {
    try {
        const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });
        // Create a page
        const page = await browser.newPage();
        // Go to your site
        await page.goto(`https://tradingeconomics.com/${country}/gasoline-prices`);
        await page.exposeFunction("mergeArrays", mergeArrays);
        const result = await page.evaluate(async () => {
            const rows = document.querySelectorAll('#ctl00_ContentPlaceHolder1_ctl00_ctl01_Panel1 tbody tr');
            const header = document.querySelectorAll('#ctl00_ContentPlaceHolder1_ctl00_ctl01_Panel1 thead tr');
            const htmlHeaders = Array.from(header, row => {
                const columns = row.querySelectorAll('th');
                return Array.from(columns, column => column.innerText);
            });
            const htmlRows = Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
            return await mergeArrays(htmlHeaders[0], htmlRows[0]);
        });
        await page.close();
        return await result;
    }
    catch (err) {
        console.log('error got to prices', err);
    }
};
export { goToPrices };
//# sourceMappingURL=index.js.map