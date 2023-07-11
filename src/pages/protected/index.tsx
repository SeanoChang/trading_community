import Head from "next/head";
import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/[...nextauth]";
import Navbar from "~/components/home/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import IndexSidebar from "~/components/protected/expandible/IndexSidebar";
import Footer from "~/components/home/Footer";
import Quote from "~/components/home/Quote";
import HomePrice from "~/components/home/HomePrice";
import { getPrices } from "../api/price";
import { type Prices } from '~/components/home/HomePrice'
import { type Session } from "~/utils/session";
import { type NextApiRequest, type NextApiResponse } from "next";
import { showing, hiding } from "../../utils/animation"

const ProtectedHome = (props: { name: string, rand_quote: number }): JSX.Element => {
  // show state for sidebar
  const [show, setShow] = useState(false);

  const assets = ["btc", "eth"];
  let prices: Prices[] = [];
  getPrices(assets.join(",")).then((res) => {
    prices = res as Prices[];
  }).catch((err) => {
    console.error(err)
  })

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home for the trading community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-950">
        <Navbar show={show} setShow={setShow}/>
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
              <Quote rand={props.rand_quote} />
              <h1 className="text-center text-6xl font-semibold text-white">
                Welcome to the Trading Community {props.name}
              </h1>
              <HomePrice prices={prices} />
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

export async function getServerSideProps(context: {req: NextApiRequest, res: NextApiResponse}) {
  const session: Session = await getServerSession(context.req, context.res, authOptions) as Session;

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      name: session.user.name,
      rand_quote: Math.floor(Math.random() * 100),
    },
  }
}