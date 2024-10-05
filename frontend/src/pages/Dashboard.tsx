import { useState, useEffect } from "react";
import { Search, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import DisplayCards from "../components/DisplayCards";
import Card from "../components/Card";
import DashboardFooter from "../components/DashboardFooter";
import { LoginFirst } from "../components/LoginFirst";
import { useAllUsers, useProfile, useTransactions } from "../Hooks/Hooks";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const { data, setFilter } = useAllUsers();
  const { myData, loading } = useProfile();
  const { transactions, refetch } = useTransactions();
  const [activeSection, setActiveSection] = useState("sendMoney");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleTransactionButton = () => {
    refetch();
    setActiveSection(
      activeSection === "sendMoney" ? "transactions" : "sendMoney"
    );
  };

  const filterData = data.filter((item) => item.id != myData?.id);

  if (!token) {
    return <LoginFirst />;
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
      <Nav />
      <main className="container md:pt-32 pt-28 mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="md:mb-12 mb-6">
          <div>
            <h1 className="flex flex-col md:text-5xl text-4xl font-bold mb-2">
              Welcome back,
              <span className="text-2xl capitalize text-neutral-400">
                {loading ? (
                  <Spinner label="Fetching your Name" />
                ) : (
                  myData?.name
                )}
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              {activeSection === "sendMoney" ? "Send Money" : "Transactions"}
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTransactionButton}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs md:text-base transition-colors duration-300"
              aria-label={
                activeSection === "sendMoney"
                  ? "View Transactions"
                  : "Back to Send Money"
              }
            >
              {activeSection === "sendMoney"
                ? "View Transactions"
                : "Back to Send Money"}
            </motion.button>
          </div>
          {activeSection === "sendMoney" ? (
            <>
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
              <div className="space-y-4 h-[60vh] overflow-y-auto custom-scrollbar">
                {filterData.length > 0 ? (
                  filterData.map((user) => (
                    <div key={user.id}>
                      <Card id={user.id} name={user.name} email={user.email} />
                    </div>
                  ))
                ) : (
                  <div className="font-semibold text-center py-4">
                    No user found...
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4 h-[60vh] overflow-y-auto custom-scrollbar">
              {transactions.length > 0 ? (
                <ul className="space-y-4">
                  {transactions.map((transaction) => (
                    <li
                      key={transaction.id}
                      className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.sender.email === myData?.email
                                ? "bg-red-100 dark:bg-red-900"
                                : "bg-green-100 dark:bg-green-900"
                            }`}
                          >
                            {transaction.sender.email === myData?.email ? (
                              <ArrowUpRight className="h-6 w-6  text-red-500 dark:text-red-300" />
                            ) : (
                              <ArrowDownLeft className="h-6 w-6 text-green-500 dark:text-green-300" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-lg">
                              {transaction.sender.email === myData?.email
                                ? "Paid"
                                : "Received"}
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                              {transaction.sender.email === myData?.email
                                ? transaction?.receiver?.name ?? "Deleted User"
                                : transaction?.sender?.name ?? "Deleted User"}
                            </p>
                            <p className="text-neutral-400 dark:text-neutral-500 text-xs">
                              {transaction.sender.email === myData?.email
                                ? transaction?.receiver?.email ??
                                  "deleteduser@gmail.com"
                                : transaction?.sender?.email ??
                                  "deleteduser@gmail.com"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div
                            className={`font-bold text-lg ${
                              transaction.sender.email === myData?.email
                                ? "text-red-500 dark:text-red-400"
                                : "text-green-500 dark:text-green-400"
                            }`}
                          >
                            {transaction.sender.email === myData?.email
                              ? "-"
                              : "+"}
                            ${transaction.amount}
                          </div>
                          <div className="md:flex gap-2">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                              {new Date(
                                transaction?.timestamp
                              ).toLocaleDateString()}{" "}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                              {new Date(
                                transaction?.timestamp
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="font-semibold text-center py-4">
                  No transactions found...
                </div>
              )}
            </div>
          )}
        </div>
        <DashboardFooter />
      </main>
    </div>
  );
}
