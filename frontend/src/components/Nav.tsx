import { Bell, Sun, User } from "lucide-react";
// import { useState } from "react";

const Nav = () => {
  // const [theme, setTheme] = useState("light");

  return (
    <div className="w-full relative ">
      <header className="fixed md:w-[90%] w-[94%] md:top-5 top-2 left-3 md:left-16 border-2 z-50 dark:border-neutral-800 dark:bg-opacity-55 dark:backdrop-filter dark:backdrop-blur-lg  rounded-xl bg-white dark:bg-neutral-800 shadow-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold">CRED</div>
          <div className="flex items-center space-x-4">
            <button
              // onClick={toggleTheme}
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition duration-300"
            >
              {/* {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )} */}
              <Sun className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </button>
            <button className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition duration-300">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition duration-300">
                <User className="h-5 w-5" />
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
