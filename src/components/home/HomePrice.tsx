import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  spring,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TiArrowForwardOutline } from "react-icons/ti";
import PriceImage from "../../public/blockchain_icon/blockchain_08.png";
import { api } from "~/utils/api";

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

const PriceBox = (props: { pair: Prices} ): JSX.Element => {
 return (
  <div>

  </div>
 )
}


const HomePrice = (props: { prices: Prices[]}): JSX.Element => {
  const PriceBoxes = props.prices.map((e) => {
    <PriceBox pair={e}/>
  })

  return (
    <div>
      
    </div>
  )
}

export type { Prices };

export default HomePrice;