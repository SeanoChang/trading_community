import Head from "next/head";
import ProfileNavbar from "~/components/protected/profile/ProfileNavbar";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const FollowingsPage = (): JSX.Element => {
    const router = useRouter();
    const { data } = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/").catch((err) => console.error(err));
      },
    });

    // get all following
    const { data: following } = api.following.getUserFollowingsByEmail.useQuery({
        email: data?.user?.email as string,
    });

    return (
        <>
            <Head>
                <title>Following</title>
            </Head>
            <main>
                <ProfileNavbar  />
                <div className="flex flex-col justify-start items-center min-h-screen bg-gray-950">
                    <h1 className="text-5xl text-gray-50">Following</h1>
                    {
                        following?.map((follower) => (
                            <motion.div className="flex flex-row items-center justify-center">
                                <img
                                    src={
                                        follower?.followingImage
                                            ? follower?.followingImage
                                            : "https://img.icons8.com/?size=512&id=ABBSjQJK83zf&format=png"
                                    }
                                    alt="Profile Picture"
                                    className="h-16 w-16 rounded-full bg-gray-50"
                                />
                                <div className="ml-2 flex flex-col items-start justify-center">
                                    <h1 className="text-2xl text-gray-50">{follower?.followingName}</h1>
                                    <h1 className="text-xl text-gray-50">{follower?.followingIntro}</h1>
                                </div>
                            </motion.div>
                        ))
                    }

                </div>
            </main>
        </>
    )

}

export default FollowingsPage