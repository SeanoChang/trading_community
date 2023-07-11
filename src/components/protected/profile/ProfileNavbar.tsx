import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MenuDropdown from "../expandible/MenuDropdown";
import UserDropdown from "../expandible/UserDropdown";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";

const ProfileNavbar = (): JSX.Element => {
    const [userDropdown, setUserDropdown] = useState(false);
    // small screen menu dropdown
    const [menuDropdown, setMenuDropdown] = useState(false);
  
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 300,
      damping: 20,
      restDelta: 0.005,
    });
  
    const { data: sessionData } = useSession();
  
    return (
      <motion.nav
        className="sticky top-0 z-20 w-full border-gray-200 bg-white dark:bg-gray-900"
        initial={false}
      >
        <motion.div className="mx-auto flex flex-wrap items-center justify-between p-4">
          <ul className="hidden flex-row items-center justify-between text-gray-50 sm:flex">
            <li className="px-4">
              <Link href="/protected">Community</Link>
            </li>
            <li className="px-4">
              <Link href="/protected/channels">Channels</Link>
            </li>
            <li className="px-4">
              <Link href="/protected/dashboard">Dashboard</Link>
            </li>
          </ul>
          <motion.div
            className="flex flex-row items-center"
            initial={false}
            animate={menuDropdown ? "open" : "closed"}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="sm:hidden"
              onClick={() => setMenuDropdown(!menuDropdown)}
            >
              <MdOutlineMoreVert className="text-2xl text-gray-50" />
            </motion.button>
            <MenuDropdown menuDropdown={menuDropdown} />
          </motion.div>
          <motion.div
            initial={false}
            animate={userDropdown ? "open" : "closed"}
            className="flex flex-row items-center"
          >
            <motion.button
              className="px-4 hover:cursor-pointer"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <FaUserCircle className="text-2xl text-gray-50" />
            </motion.button>
            <UserDropdown
              userDropdown={userDropdown}
              username={sessionData?.user?.name as string}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="h-1 bg-[#e07e2d] dark:bg-[#f1f13c]"
          style={{ scaleX }}
        />
      </motion.nav>
    );
}

export default ProfileNavbar;