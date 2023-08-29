import Head from "next/head";
import ProfileNavbar from "~/components/protected/profile/ProfileNavbar";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";

const FollowersPage = (): JSX.Element => {
    const router = useRouter();
    const { data } = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/").catch((err) => console.error(err));
      },
    });

    // get all followers
    const { data: followers } = api.followers.getUserFollowersByEmail.useQuery({
        email: data?.user?.email as string,
    });

    return (
        <>
            <Head>
                <title>Followers</title>

            </Head>
            <main>
                <ProfileNavbar />
                <div className="flex flex-col justify-start items-center min-h-screen bg-gray-950">
                    <h1 className="text-5xl text-gray-50">Followers</h1>
                    {
                        followers?.map((follower, i) => (
                            <motion.div className="flex flex-row items-center justify-center" key={i}>
                                <Image
                                    src={
                                        follower?.followerImage
                                            ? follower?.followerImage
                                            : "https://img.icons8.com/?size=512&id=ABBSjQJK83zf&format=png"
                                    }
                                    alt="Profile Picture"
                                    className="h-16 w-16 rounded-full bg-gray-50"
                                />
                                <div className="ml-2 flex flex-col items-start justify-center">
                                    <h1 className="text-2xl text-gray-50">{follower?.followerName}</h1>
                                    <h1 className="text-xl text-gray-50">{follower?.followerIntro}</h1>
                                </div>
                            </motion.div>
                        ))
                    }

                </div>
            </main>
        </>
    )
}

export default FollowersPage