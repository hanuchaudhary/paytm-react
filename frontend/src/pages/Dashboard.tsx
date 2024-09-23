import Nav from "../components/Nav";
import DisplayCards from "../components/DisplayCards";
import Card from "../components/Card";
import DashboardFooter from "../components/DashboardFooter";
import { Search } from "lucide-react";
import { useAllUsers, useProfile } from "../Hooks/Hooks";

export default function Dashboard() {
  const { data, setFilter } = useAllUsers();
  const { myData } = useProfile();

  const filterData = data.filter((item) => item.id != myData?.id);

  function handleOnClick() {}

  return (
      <div className="min-h-screen transition-colors duration-500 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
        <div>
          <Nav />
        </div>
        <main className="container md:pt-32 pt-28 mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="md:mb-12 mb-6">
            <div>
              <h1 className="flex flex-col md:text-5xl text-4xl font-bold mb-2">
                Welcome back,
                <span className="text-2xl text-neutral-400">
                  {" "}
                  {myData?.name}
                </span>
              </h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Here's your financial overview
            </p>
          </div>
          <div>
            <DisplayCards />
          </div>
          <div className="bg-white dark:bg-neutral-800 transition-colors duration-500 rounded-2xl md:p-6 sm:p-4 p-3 shadow-lg md:mb-12 mb-6">
            <h3 className="text-xl font-bold mb-4">Send Money</h3>
            <div className="mb-4 seachCompo">
              <div className="relative">
                <input
                  type="text"
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 transition-colors duration-500 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              </div>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-scroll custom-scrollbar">
              {filterData.map((user) => (
                <div key={user.id}>
                  <Card
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    onClick={handleOnClick}
                  />
                </div>
              ))}
            </div>
          </div>

          <DashboardFooter />
        </main>
      </div>
  );
}
