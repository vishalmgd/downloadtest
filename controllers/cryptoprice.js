const axios = require("axios");

//  // // caching

// const NodeCache = require("node-cache");
// const cache = new NodeCache();

const cryptoprice = async (req, res) => {
  // ///// caching technique
  // const cachedData = cache.get("coinPrices");

  // if (cachedData) {
  //   console.log("Serving from cache...");
  //   console.log("Cache expiry time:", cache.getTtl("coinPrices"));
  //   return res.render("crypto", { coinPrices: cachedData });

  // } else {
  const coinnames = [
    "BTC",
    "ETH",
    "SFM",
    "LTC",
    "BNB",
    "XRP",
    "ADA",
    "DOGE",
    "SOL",
    "SHIB",
    "TRX",
  ];
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coinnames.join(
    ","
  )}`;
  axios
    .get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
    })
    .then((response) => {
      const coinData = response.data.data;
      const coinPrices = {};
      coinnames.forEach((coinname) => {
        const currentPrice = coinData[coinname].quote.USD.price;
        const roundedOffPrice =
          currentPrice > 10
            ? Math.round(currentPrice * 10) / 10
            : Math.round(currentPrice * 1000000) / 1000000;
        coinPrices[coinname] = roundedOffPrice;
      });
      console.log(Object.keys(coinPrices));

      console.log(coinPrices);

      res.render("crypto", { coinPrices });

      ///// caching

      // const cacheTime = 60* 60 * 0.5 //60 * 60 * 4; // 4 hours in milliseconds
      // cache.set("coinPrices", coinPrices, cacheTime); // posts is key formattedPost is value

      // res.render("crypto", { coinPrices: coinPrices });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error getting cryptocurrency information");
    });
};

module.exports = { cryptoprice };
