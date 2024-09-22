import Nav from "../components/Nav";
import DisplayCards from "../components/DisplayCards";
import Card from "../components/Card";
import DashboardFooter from "../components/DashboardFooter";
import { Search } from "lucide-react";

export default function Dashboard() {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", balance: 1000 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", balance: 1500 },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      balance: 2000,
    },
    { id: 4, name: "Diana Ross", email: "diana@example.com", balance: 2500 },
    { id: 1, name: "Alice Johnson", email: "alice@example.com", balance: 1000 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", balance: 1500 },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      balance: 2000,
    },
    { id: 4, name: "Diana Ross", email: "diana@example.com", balance: 2500 },
    { id: 4, name: "Diana Ross", email: "diana@example.com", balance: 2500 },
    { id: 1, name: "Alice Johnson", email: "alice@example.com", balance: 1000 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", balance: 1500 },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      balance: 2000,
    },
    { id: 4, name: "Diana Ross", email: "diana@example.com", balance: 2500 },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
      <Nav />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Here's your financial overview
          </p>
        </div>

        <DisplayCards />

        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-12">
          <h3 className="text-xl font-bold mb-4">Send Money</h3>
          <div className="mb-4 seachCompo">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </div>
          </div>
          <div className="space-y-4 h-[70vh] overflow-y-scroll">
            {users.map((user, idx) => (
              <Card name={user.name} email={user.email} key={idx} />
            ))}
          </div>
        </div>

        <DashboardFooter />
      </main>
    </div>
  );
}
