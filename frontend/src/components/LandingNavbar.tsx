import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../providers/LocalThemeProvider";

const LandingNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <header className="fixed md:w-[90%] w-[94%] md:top-5 top-2 left-3 md:left-16 border z-50 dark:border-neutral-800 dark:bg-opacity-40 dark:backdrop-filter dark:backdrop-blur-lg backdrop-filter backdrop-blur-lg shadow-neutral-600/5 bg-opacity-70 font-semibold border-neutral-100 rounded-xl bg-white dark:bg-neutral-800 shadow-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold"><span className="text-blue-600">re</span>PAY</div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#features"
              className="hover:text-indigo-500 transition duration-300"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-indigo-500 transition duration-300"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="hover:text-indigo-500 transition duration-300"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 bg-opacity-45 dark:bg-opacity-45 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition duration-300"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            <Link to={"/signup"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br md:text-base text-sm from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                Sign Up
              </motion.div>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingNavbar;
