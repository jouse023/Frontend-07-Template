const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  // await page.screenshot({path: 'example.png'});
  const a = await page.$('div');
  console.log(await a.asElement().boxModel());
  await browser.close();
})();