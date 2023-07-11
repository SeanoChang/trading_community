import Head from "next/head";
import ProfileNavbar from "~/components/protected/profile/ProfileNavbar";
import { motion } from "framer-motion";
import { getServerSession } from "next-auth/next";
import authOptions from "../../api/auth/[...nextauth]";
import { api } from "~/utils/api";
import Winrate from "~/components/protected/profile/Winrate";
import Roi from "~/components/protected/profile/Roi";
import TradingPairs from "~/components/protected/profile/TradingPairs";
import MonthlyGoals from "~/components/protected/profile/MontlyGoals";
import WeeklyGoals from "~/components/protected/profile/WeeklyGoals";
import { type NextApiRequest, type NextApiResponse } from "next";
import { type Session } from "~/utils/session"

const ProfilePage = (props: {email: string, image: string}): JSX.Element => {
  // get current user
  const user = api.user.getCurrentUser.useQuery({
    email:  props.email as string,
  });

  // get all followers
  const { data: followers } = api.followers.getUserFollowersById.useQuery({
    id: user?.data?.id as string,
  });

  // get all following
  const { data: following } = api.following.getUserFollowingsById.useQuery({
    id: user?.data?.id as string,
  });

  // get all posts

  // get all channels

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main>
        <ProfileNavbar />
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950">
          <h1 className="text-5xl text-gray-50">Profile</h1>
          <div className="flex flex-row items-center justify-center">
            <motion.div className="flex flex-row items-center justify-center">
              <img
                src={
                  props.image
                    ? props.image
                    : "https://img.icons8.com/?size=512&id=ABBSjQJK83zf&format=png"
                }
                alt="Profile Picture"
                className="h-16 w-16 rounded-full bg-gray-50"
              />
              <div className="ml-2 flex flex-col items-start justify-center">
                <h2 className="text-gray-50">{user?.data?.name}</h2>
                <h3 className="text-gray-50">
                  {followers?.length === undefined ? "0" : followers?.length}{" "}
                  Followers
                </h3>
                <h3 className="text-gray-50">
                  {following?.length === undefined ? "0" : following?.length}{" "}
                  Following
                </h3>
              </div>
            </motion.div>
            <motion.div>
              <h2 className="text-gray-50">Price List...</h2>
            </motion.div>
          </div>
          <div className="flex flex-col md:flex-row">
            <Winrate />
            <Roi />
            <TradingPairs />
          </div>
          <div className="flex flex-col md:flex-row">
            <MonthlyGoals />
            <WeeklyGoals />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;

export async function getServerSideProps(context: {req: NextApiRequest, res: NextApiResponse}) {
  const session: Session = await getServerSession(context.req, context.res, authOptions).then((res) => {
    return JSON.parse(JSON.stringify(res))
  }).catch((err) => {
    console.error(err)
  })

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
      email: session.user.email as string,
      image: session.user.image as string,
    },
  }
}
