import { motion, type Variants } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const UserDropdown = (props: {
  userDropdown: boolean;
  username: string;
}): JSX.Element => {
  return (
    <motion.ul
      className="items-left absolute right-6 top-12 z-50 flex w-40 flex-col justify-center rounded-md bg-white p-4 text-sm shadow-lg dark:bg-gray-800"
      variants={{
        open: {
          clipPath: "inset(0% 0% 0% 0% round 10px)",
          transition: {
            type: "spring",
            bounce: 0.1,
            duration: 0.7,
            delayChildren: 0.2,
            staggerChildren: 0.05,
          },
        },
        closed: {
          clipPath: "inset(3% 10% 97% 90% round 10px)",
          transition: {
            type: "spring",
            bounce: 0.1,
            duration: 0.3,
          },
        },
      }}
      style={{ pointerEvents: props.userDropdown ? "auto" : "none" }}
    >
      <motion.li
        variants={itemVariants}
        className="items-right flex flex-col justify-normal"
      >
        <span className="text-gray-400">Hey there &#128075;</span>
        <span className="text-gray-50">{props.username}</span>
      </motion.li>
      <motion.li variants={itemVariants}>
        <hr className="my-2"></hr>
      </motion.li>
      <motion.li variants={itemVariants}>
        <Link href="/protected/profile" className="text-gray-200">
          Your Profile
        </Link>
      </motion.li>
      <motion.li variants={itemVariants}>
        <Link href="/protected/profile/following" className="text-gray-200">
          Your Following
        </Link>
      </motion.li>
      <motion.li variants={itemVariants}>
        <Link href="/protected/profile/followers" className="text-gray-200">
          Your Followers
        </Link>
      </motion.li>
      <motion.li variants={itemVariants}>
        <Link href="/protected/profile/channels" className="text-gray-200">
          Your Channels
        </Link>
      </motion.li>
      <motion.li variants={itemVariants}>
        <Link href="/protected/profile/posts" className="text-gray-200">
          Your Posts
        </Link>
      </motion.li>
      <motion.li variants={itemVariants}>
        <hr className="my-2"></hr>
      </motion.li>
      <motion.li variants={itemVariants}>
        <Link href="/protected/settings" className="text-gray-200">
          Settings
        </Link>
      </motion.li>
      <motion.li variants={itemVariants}>
        <Link href="/protected/help" className="text-gray-200">
          Help
        </Link>
      </motion.li>
      <motion.li variants={itemVariants}>
        <hr className="my-2"></hr>
      </motion.li>
      <motion.li variants={itemVariants}>
        <div
          className="text-gray-200 hover:cursor-pointer"
          onClick={() => {
            signOut().catch((err) => console.error(err));
          }}
        >
          Sign Out
        </div>
      </motion.li>
    </motion.ul>
  );
};

export default UserDropdown;
