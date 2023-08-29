type Prices = {
  name: string;
  symbol: string;
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  volume_24h: number;
  time_stamp: string;
};

type NewsSource = {
  name: string;
  url: string;
  paths: string[];
  remove: string[];
  selector: string;
};

type News = {
  title: string;
  link: string;
  source: string;
};

export type { Prices, NewsSource, News };
