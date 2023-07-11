import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const MenuDropdown = (props: { menuDropdown: boolean }): JSX.Element => {
  return (
    <motion.ul
      className="absolute left-6 top-12 z-50 w-32 flex flex-col justify-center items-center rounded-md p-4 shadow-lg bg-gray-800 text-gray-100 text-base"
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
          clipPath: "inset(3% 90% 97% 10% round 10px)",
          transition: {
            type: "spring",
            bounce: 0.1,
            duration: 0.3,
          },
        },
      }}
      style={{ pointerEvents: props.menuDropdown ? "auto" : "none" }}
    >
      <motion.li variants={itemVariants}
        className="my-1 hover:underline"
      >
        <Link href="/protected">Community</Link>
      </motion.li>
      <motion.li variants={itemVariants} className="my-1 hover:underline">
        <Link href="/protected/channels">Channels</Link>
      </motion.li>
      <motion.li variants={itemVariants} className="my-1 hover:underline">
        <Link href="/protected/dashboard">Dashboard</Link>
      </motion.li>
    </motion.ul>
  );
};

export default MenuDropdown;
