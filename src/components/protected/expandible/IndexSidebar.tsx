import { motion, type Variants } from "framer-motion";
import { signOut } from "next-auth/react";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  closed: { opacity: 0, x: -20, y: 0, transition: { duration: 0.2 } },
};

const IndexSidebar = (props: { show: boolean }): JSX.Element => {
  return (
    <motion.ul
      className="sticky right-0 top-[60px] z-10 flex h-[calc(100vh-60px)] w-64 flex-col bg-gray-800"
      id="sidebar"
      variants={{
        open: {
          display: "block",
          clipPath: "inset(0% 0% 0% 0%)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05,
          },
        },
        closed: {
          clipPath: "inset(0% 100% 0% 0%)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3,
          },
          transitionEnd: {
            display: "none",
          },
        },
      }}
      style={{ pointerEvents: props.show ? "auto" : "none" }}
    >
      <motion.li
        className="border-b border-gray-700 px-10 py-4 text-white hover:bg-gray-700 hover:text-white"
        variants={itemVariants}
      >
        <a href="#">&#127982; Dashboard</a>
      </motion.li>
      <motion.li
        className="border-b border-gray-700 px-10 py-4 text-white hover:bg-gray-700 hover:text-white"
        variants={itemVariants}
      >
        <a href="#">&#128200; Watchlist</a>
      </motion.li>
      <motion.li
        className="border-b border-gray-700 px-10 py-4 text-white hover:bg-gray-700 hover:text-white"
        variants={itemVariants}
      >
        <a href="#">&#128240; News</a>
      </motion.li>
      <motion.li
        className="border-gray-700 px-10 py-4 text-white hover:bg-gray-700 hover:text-white"
        variants={itemVariants}
      >
        <div
          onClick={() => {
            signOut().catch((err) => console.error(err));
          }}
          className="hover:cursor-pointer"
        >
          &#128682; Sign Out
        </div>
      </motion.li>
    </motion.ul>
  );
};

export default IndexSidebar;
