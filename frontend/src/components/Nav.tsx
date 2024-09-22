import { Bell, Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";

const Nav = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <header className="bg-white dark:bg-neutral-800 shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">CRED</div>
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
  );
};

export default Nav;
