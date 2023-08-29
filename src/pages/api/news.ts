import axios from "axios";
import Cors from "cors";
import isValidUrl from "../../utils/validUrl";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import type { News, NewsSource } from "../../utils/types";

type CorsFunction = (req: Cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void

const newsSources: NewsSource[] = [
  {
    name: "CoinDesk",
    url: "https://www.coindesk.com",
    paths: ["/tag/bitcoin/", "/tag/ethereum/", "/tag/altcoins/"],
    remove: [""],
    selector:
      "div.article-card > div > div.articleTextSection > h6 > a.card-title",
  },
  {
    name: "CyrptoSlate",
    url: "https://cryptoslate.com",
    paths: ["/top-news/"],
    remove: [""],
    selector: "div.posts > div > article > a",
  },
  {
    name: "NewsBTC",
    url: "https://www.newsbtc.com",
    paths: ["/news/"],
    remove: ["jeg_siderbar"],
    selector: "article.jeg_post :header > a",
  },
];

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: CorsFunction
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: Response) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const getSpecificPath = async (
  source: NewsSource,
  path: string,
  pieces: number
) => {
  const url = `${source.url}${path}`;
  const newsLists: News[] = [];
  const piecesOfNews = source.name === "CryptoSlate" ? pieces * 2 : pieces;
  try {
    const response = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    const $ = cheerio.load(response.data);
    if (source.remove.length > 0) {
      source.remove.forEach((remove) => {
        $(remove).remove();
      });
    }
    // add title and link to news list
    $(`${source.selector}`).each((i: number, el: cheerio.AnyNode) => {
      if (i < piecesOfNews) {
        let title = $(el).attr("title");
        if (title === undefined) {
          title = $(el).text();
        }
        title = title!.replace(/^\s+|\s+$/g, "");
        let link = $(el).attr("href");
        if (!isValidUrl(link!)) {
          link = `${source.url}${link}`;
        }

        newsLists.push({
          title: title,
          link: link!,
          source: source.name,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }

  return newsLists;
};

const getNews = async (pieces: number) => {
  let newsLists: News[] = [];
  try {
    await Promise.all(
      newsSources.map(async (source) => {
        for (const path of source.paths) {
          let news = await getSpecificPath(source, path, pieces);
          newsLists = [...newsLists, ...news];
        }
      })
    );
  } catch (ex) {
    // error
    console.log(ex);
  }
  if (newsLists.length > 0) {
    return newsLists;
  }
  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // get query params -> number of new to fetch
  let pieces: number = 2;
  if (req.query.pieces !== undefined) {
    pieces = parseInt(req.query.pieces as string);
  }

  // Rest of the API logic
  let newsLists: News[] | null = await getNews(pieces);

  if (newsLists !== null) {
    res.status(200).json(newsLists);
  } else {
    res
      .status(500)
      .json({ error: "Something went wrong while fetch news resources" });
  }
}
