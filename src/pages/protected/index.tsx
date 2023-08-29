import Head from "next/head";
import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/[...nextauth]";
import Navbar from "~/components/home/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import IndexSidebar from "~/components/protected/expandible/IndexSidebar";
import Footer from "~/components/home/Footer";
import Quote from "~/components/home/Quote";
import HomePrice from "~/components/home/HomePrice";
import HomeNews from "~/components/home/HomeNews";
import type { Prices, News } from "~/utils/types";
import type { Session } from "~/utils/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { showing, hiding } from "../../utils/animation";
import Loading from "../../components/home/Loading";

const defaultAssets = [
  "btc",
  "eth",
  "xrp",
  "ada",
  "doge",
  "ape",
  "dot",
  "atom",
  "sol",
  "aave",
  "bnb",
  "etc",
  "chz",
  "ens",
  "sushi",
  "near",
];
let queryAssets = defaultAssets.join(",");

let newsPieces = 3;

const ProtectedHome = (props: {
  name: string;
  rand_quote: number;
}): JSX.Element => {
  // show state for sidebar
  const [show, setShow] = useState(false);

  const [prices, setPrices] = useState<Prices[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [priceLoading, setPriceLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    // find the size of the screen, update width every refresh
    const width = window.innerWidth;
    if (width < 768) {
      queryAssets = defaultAssets.slice(0, 8).join(",");
      newsPieces = 1;
    } else if (width < 1024) {
      queryAssets = defaultAssets.slice(0, 15).join(",");
      newsPieces = 2;
    }

    setPriceLoading(true);
    fetch(`/api/prices?assets=${queryAssets}`)
      .then((response) => response.json())
      .then((data) => {
        setPrices(data);
        setPriceLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    setNewsLoading(true);
    fetch(`/api/news?pieces=${newsPieces}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setNewsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home for the trading community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-950">
        <Navbar show={show} setShow={setShow} />
        <motion.div
          className="flex flex-row"
          initial={false}
          animate={show ? "open" : "closed"}
        >
          <IndexSidebar show={show} />
          <div className="flex w-screen flex-row items-center justify-center">
            <motion.div
              className="w-32"
              animate={show ? showing : hiding}
            ></motion.div>
            <motion.div className="max-w-screen top-[100vh-64px] z-0 flex min-h-screen flex-col items-center justify-center text-white">
              <div className="flex flex-col justify-center items-center my-16 h-[50vh]">
                <h1 className="text-center text-6xl font-semibold text-white">
                  Welcome to the Trading Community
                </h1>
                <h1 className="mt-2 text-center text-5xl font-semibold text-white">
                  {props.name}
                </h1>
                <Quote rand={props.rand_quote} />
              </div>
              {
                // if the prices are loading, show a loading screen
                priceLoading ? <Loading /> : <HomePrice prices={prices} />
              }
              {
                // if the news are loading, show a loading screen
                newsLoading ? <Loading /> : <HomeNews newsList={news} />
              }
            </motion.div>
            <motion.div
              className="w-32"
              animate={show ? showing : hiding}
            ></motion.div>
          </div>
        </motion.div>
        <Footer />
      </main>
    </>
  );
};

export default ProtectedHome;

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session: Session = (await getServerSession(
    context.req,
    context.res,
    authOptions
  )) as Session;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      name: session.user.name,
      rand_quote: Math.floor(Math.random() * 100),
    },
  };
}
