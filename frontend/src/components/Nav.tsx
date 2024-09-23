import { Bell, Moon, Sun} from "lucide-react";
import { useEffect, useState } from "react";
import { useProfile } from "../Hooks/Route";

const Nav = () => {
  const [theme, setTheme] = useState("dark");

  const { myData } = useProfile();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className="w-full relative ">
      <header className="fixed md:w-[90%] w-[94%] md:top-5 top-2 left-3 md:left-14 lg:left-16 border-2 z-[100] dark:border-neutral-800 dark:bg-opacity-55 dark:backdrop-filter dark:backdrop-blur-md backdrop-filter backdrop-blur-md bg-opacity-55 border-neutral-200 rounded-xl bg-neutral-300 dark:bg-neutral-800 shadow-md py-5">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold ">rePAY</div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition duration-300"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            <button className="p-2 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition duration-300">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-full bg-neutral-300 dark:bg-neutral-700 dark:bg-opacity-55 hover:bg-neutral-400 dark:hover:bg-neutral-600 dark:backdrop-filter dark:backdrop-blur-sm backdrop-filter backdrop-blur-md bg-opacity-55 transition duration-300">
                <h1 className="h-7 w-7 flex items-center justify-center font-semibold ">
                  {myData?.name.split(" ").map((e) => e[0])}
                </h1>
                <span className="sr-only">User menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Nav;
