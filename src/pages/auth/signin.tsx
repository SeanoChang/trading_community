import {
  type ClientSafeProvider,
  getProviders,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { type BuiltInProviderType } from "next-auth/providers";
import { motion } from "framer-motion";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

const Signin = (
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
) => {
  const providerStyles = [
    {
      bgcolor: "bg-[#7289DA]",
      iconcolor: "text-gray-100",
      icon: <FaDiscord />,
    },
    {
      bgcolor: "bg-gray-800",
      iconcolor: "text-gray-100",
      icon: <BsGithub />,
    },
    {
      bgcolor: "bg-gray-100",
      iconcolor: "text-gray-800",
      icon: <BsGoogle />,
    },
  ];

  if (!providers) return null;

  const providerList = Object.values(
    providers.providers as unknown as Provider[]
  ).map((provider: Provider, index: number) => {
    return (
      <div
        key={provider.id}
        id={provider.name}
        className="flex w-full flex-row items-center justify-center py-4 text-lg xl:text-xl"
      >
        <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
          onClick={() =>
            void signIn(provider.id, {
              callbackUrl: `${window.location.origin}/protected`,
            })
          }
          className={`flex w-2/3 flex-row items-center justify-evenly rounded-lg transition duration-150 hover:shadow-lg hover:shadow-slate-500/50 ${
            providerStyles[index]?.bgcolor as string
          } ${providerStyles[index]?.iconcolor as string}`}
        >
          <span className="p-1 sm:p-2">{providerStyles[index]?.icon}</span>
          <span className="overflow-clip py-2 pr-2 text-sm sm:py-4 sm:pr-4">
            {provider.name}
          </span>
        </motion.button>
      </div>
    );
  });

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center bg-[#030618]">
      <div className="flex w-[200px] flex-col items-center justify-center rounded-lg bg-slate-300 text-center sm:w-[300px]">
        {providerList}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Signin;
