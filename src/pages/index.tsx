import Head from "next/head";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Quote from "../components/home/Quote";
import { getServerSession } from "next-auth/next";
import authOptions from "./api/auth/[...nextauth]";
import { type Session } from "../utils/session";
import { type NextApiRequest, type NextApiResponse } from "next";

type HomeProps = {
  rand_quote: number;
}

const Home = (props: HomeProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home for the trading community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950">
          <h1 className="text-center text-6xl font-bold text-gray-50">
            Welcome to Our Community
          </h1>
          <Quote rand={props.rand_quote} />
          <motion.button
            drag={true}
            dragSnapToOrigin
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="z-20 mt-8 rounded-full bg-slate-500 px-4 py-2 text-white"
            onClick={() => void signIn()}
            id="sign-in-button"
          >
            Sign in
          </motion.button>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: {req: NextApiRequest, res: NextApiResponse}) {
  const session: Session = await getServerSession(context.req, context.res, authOptions) as Session;

  if (session) {
    return {
      redirect: {
        destination: '/protected',
        permanent: false,
      },
    }
  }

  return {
    props: {
      rand_quote: Math.floor(Math.random() * 100),
    },
  }
}
