import Nav from "../components/Nav";
import DisplayCards from "../components/DisplayCards";
import Card from "../components/Card";
import DashboardFooter from "../components/DashboardFooter";
import { Search } from "lucide-react";
import { useAllUsers, useGetBalance } from "../Hooks/Route";

export default function Dashboard() {
  const { data, setFilter } = useAllUsers();
  const { balance, loading } = useGetBalance();

  function handleOnClick() {}

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
      <div className=""></div>
      <Nav />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Here's your financial overview
          </p>
        </div>

        <DisplayCards balance={balance} loading={loading} />

        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-12">
          <h3 className="text-xl font-bold mb-4">Send Money</h3>
          <div className="mb-4 seachCompo">
            <div className="relative">
              <input
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </div>
          </div>
          <div className="space-y-4 max-h-[70vh] overflow-y-scroll">
            {data.map((user) => (
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
