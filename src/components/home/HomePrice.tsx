import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import type { Prices } from "~/utils/types";

const findPivot = (prices: Prices[], lb: number, ub: number): number => {
  // if prices object is undefined return -1
  if (prices === undefined) return -1;
  
  // if prices is empty return 0
  if(prices.length === 0) return 0;

  const pivot = parseFloat(prices[ub]?.market_cap.toString() as string); // set pivot to last element

  let i = lb - 1; // set i to one less than lower bound
  for (let j = lb; j < ub; j++) {
    // if element is less than pivot
    // swap i and j elements
    // parse float to avoid string comparison
    if (parseFloat(prices[j]?.market_cap.toString() as string) > pivot) {
      i++;
      [prices[i], prices[j]] = [prices[j], prices[i]] as [Prices, Prices];
    }
  }

  // swap i+1 with pivot
  [prices[i + 1], prices[ub]] = [prices[ub], prices[i + 1]] as [Prices, Prices];

  return i + 1;
};

const qSortPrices = (prices: Prices[], lb: number, ub: number): Prices[] => {
  if (lb === ub) return prices;
  if (lb > ub) return [];

  const pivot = findPivot(prices, lb, ub);
  //qsort left side
  qSortPrices(prices, lb, pivot - 1);
  //qsort right side
  qSortPrices(prices, pivot + 1, ub);

  return prices;
};

const marketCapToStr = (marketCap: number): string => {
  if (marketCap < 1000000) {
    return (marketCap / 1000).toFixed(2) + "K";
  } else if (marketCap < 1000000000) {
    return (marketCap / 1000000).toFixed(2) + "M";
  } else {
    return (marketCap / 1000000000).toFixed(2) + "B";
  }
};

const PriceBox = (props: { price: Prices, image: string, length: number} ): JSX.Element => {
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const translate = props.length > 10 ? -100 : 0;

  const opacity = useTransform(scrollYProgress, [0.98, 1], [1, 0.5]);
  const translateX = useTransform(scrollYProgress, [0.98, 1], [0, translate]);
  const scale = useTransform(scrollYProgress, [0.98, 1], [1, 0.98]);

  const price = props.price;
  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        translateX,
        scale,
      }}
      transition={{ type: "spring", stiffness: 100 }}
      animate={{}}
      className="p-1 flex flex-row justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-500 rounded-md m-2 transition duration-100"
    >
      <div className="rounded-full overflow-hidden scale-90 sm:scale-100 m-1 mr-2">
        <Image
          src={props.image}
          alt={`${price.symbol.toLowerCase()}`}
          width={40}
          height={40}
        />
      </div>
      <div
        className={`flex flex-col p-2 transition duration-500 delay-100 w-[50vw] justify-center items-start`}
      >
        <span className="flex flex-row w-full justify-between">
          <span
            className={`flex flex-col justify-center text-base truncate text-right transition duration-100`}
          >
            {price.name}
          </span>
          <span className="flex flex-col justify-center text-xs text-right px-1">
            {price.symbol}
          </span>
        </span>
        <div className="flex flex-row items-center justify-between w-full">
          <span className="text-sm basis-1/2 xl:basis-1/3">
            {price.price}
            <span className="text-xs px-1">usd</span>
          </span>
          <div className="flex flex-row justify-end md:justify-between basis-1/2 xl:basis-2/3">
            <span className="hidden xl:inline-block px-1">
              <span>Market Cap: </span>
              <span className="text-xs">
                {marketCapToStr(price.market_cap)}
                <span className="text-xs px-1">usd</span>
              </span>
            </span>
            <span className="hidden md:inline-block px-1">
              <span
                className={`${
                  parseFloat(price.percent_change_24h.toString()) > 0
                    ? "text-green-400"
                    : "text-red-600"
                }`}
              >
                {parseFloat(price.percent_change_24h.toString()) > 0 ? "+" : ""}
                {price.percent_change_24h}%
              </span>
              <span className="text-xs"> /d</span>
            </span>
            <span className="px-1">
              <span
                className={`${
                  parseFloat(price.percent_change_1h.toString()) > 0
                    ? "text-green-400"
                    : "text-red-600"
                }`}
              >
                {parseFloat(price.percent_change_1h.toString()) > 0 ? "+" : ""}
                {price.percent_change_1h}%
              </span>
              <span className="text-xs"> /hr</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


const HomePrice = (props: { prices: Prices[]}): JSX.Element => {
  const sortedPrices = qSortPrices(props.prices, 0, props.prices.length - 1);
  const prices = sortedPrices;

  const PriceBoxes: JSX.Element[] = prices.map((e: Prices, i: number) => {
    const image: string = require(`../../../public/icon/${e.symbol.toLowerCase()}.png`) as string;

    return <PriceBox price={e} image={image} length={props.prices.length} key={i}/>
  })

  return (
    <div
    className="flex flex-col justify-center items-center w-full transition py-20 min-h-screen duration-1000 delay-100"
    id="prices"
  >
    <h1 className="text-4xl font-semibold text-white">Prices</h1>
    <div className="flex flex-col justify-center items-center w-full">
      {PriceBoxes}
    </div>
  </div>
  )
}

export default HomePrice;