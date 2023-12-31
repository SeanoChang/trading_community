import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type CorsFunction = (req: Cors.CorsRequest, res: {
  statusCode?: number | undefined;
  setHeader(key: string, value: string): any;
  end(): any;
}, next: (err?: any) => any) => void

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: CorsFunction
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export async function getPrices(assets: string) {
  // Rest of the API logic
  let response = null;
  let prices = null;
  try {
    response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${assets}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
        },
      }
    );
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
  }
  if (response) {
    // success
    const json = Object.values(response.data.data);
    prices = json.map((asset: any) => {
      return {
        name: asset.name as string,
        symbol: asset.symbol as string,
        price:
          asset.quote.USD.price < 100
            ? asset.quote.USD.price < 10
              ? asset.quote.USD.price < 1
                ? asset.quote.USD.price < 0.1
                  ? asset.quote.USD.price.toFixed(6)
                  : asset.quote.USD.price.toFixed(5)
                : asset.quote.USD.price.toFixed(4)
              : asset.quote.USD.price.toFixed(3)
            : asset.quote.USD.price.toFixed(2) as number,
        percent_change_1h: asset.quote.USD.percent_change_1h.toFixed(2) as number,
        percent_change_24h: asset.quote.USD.percent_change_24h.toFixed(2) as number,
        percent_change_7d: asset.quote.USD.percent_change_7d.toFixed(2) as number,
        market_cap: asset.quote.USD.market_cap.toFixed(2) as number,
        volume_24h: asset.quote.USD.volume_24h.toFixed(2) as number,
        time_stamp: asset.quote.USD.last_updated as string,
      };
    });
    return prices;
  }
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // handle the assets query from the client
  let assets: string = "btc,eth";
  if (typeof req.query.assets === "string") {
    assets = req.query.assets;
  }
  // Run the middleware
  await runMiddleware(req, res, cors);

  const prices = await getPrices(assets);

  if (prices) {
    res.status(200).json(prices);
  } else {
    res.status(500).json({ error: "Error getting prices" });
  }
}