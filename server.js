const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

//logger
app.use(morgan("tiny"));

const key = "3365208cdaee48c28f9e5bde7ee106a3";

app.get("/:usdPerHour/:hours?/:days?/", async (req, res, next) => {
  const rate = await axios.get(
    `https://openexchangerates.org/api/latest.json?app_id=${key}`
  );
  console.log(rate);
  const exchangeRate = await rate.data.rates.ARS;
  let { usdPerHour, hours, days } = req.params;
  if (!hours) hours = 8;
  if (!days) days = 5;

  res.json([
    `usd per hour: ${usdPerHour}`,
    `usd per month: ${hours * days * 4}`,
    `ars per hour: ${exchangeRate * usdPerHour}`,
    `ars per month: ${usdPerHour * exchangeRate * hours * days * 4}`
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
