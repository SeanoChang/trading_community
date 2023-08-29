import Head from "next/head";
import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/[...nextauth]";
import Navbar from "~/components/home/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import IndexSidebar from "~/components/protected/expandible/IndexSidebar";
import Footer from "~/components/home/Footer";
import { type Session } from "~/utils/session";
import { type NextApiRequest, type NextApiResponse } from "next";
import { showing, hiding } from "../../utils/animation";

const ChannelsPage = (props: { name: string; email: string }): JSX.Element => {
  // show state for sidebar
  const [show, setShow] = useState(false);

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
              <h1 className="text-center text-6xl font-semibold text-white">
                Sorry {props.name}, this page is currently under construction
              </h1>
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

export default ChannelsPage;

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
      email: session.user.email,
    },
  };
}
