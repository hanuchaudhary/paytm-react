import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div>
      <header className="fixed md:w-[90%] w-[94%] md:top-5 top-2 left-3 md:left-16 border-2 z-50 dark:border-neutral-800 dark:bg-opacity-55 dark:backdrop-filter dark:backdrop-blur-lg backdrop-filter backdrop-blur-lg bg-opacity-55 border-neutral-50 rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold">rePAY</div>
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
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition duration-300"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            <Link
              to={"/signup"}
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingNavbar;
