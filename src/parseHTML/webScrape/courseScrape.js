// const rp = require('request-promise');
const subject = 'AAE';
const url = `https://classes.oregonstate.edu/?srcdb=999999&subject=${subject}`;

const axios = require("axios");
const cheerio = require("cheerio");
//performing a GET request
axios
  .get(url)
  .then((response) => {
    //handling the success
    const html = response.data;
    console.log(html);
    //loading response data into a Cheerio instance
    //const $ = cheerio.load(html);
    //console.log($);
    // 'body > main > div.panel.panel--kind-results.panel--visible > div > div.panel__body > div:nth-child(2) > a'
    //selecting the elements with the data
    const scrapedata = $(html).text();

    //outputting the scraped data
    console.log(scrapedata);
  })
  //handling error
  .catch((error) => {
    console.log(error);
  });