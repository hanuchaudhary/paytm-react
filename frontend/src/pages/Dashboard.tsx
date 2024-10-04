"use client";

import { useState, useEffect } from "react";
import { Search, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Nav from "../components/Nav";
import DisplayCards from "../components/DisplayCards";
import Card from "../components/Card";
import DashboardFooter from "../components/DashboardFooter";
import { LoginFirst } from "../components/LoginFirst";
import { useAllUsers, useProfile, useTransactions } from "../Hooks/Hooks";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";

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
              className="px-4 py-2 bg-neutral-800 dark:bg-neutral-100 text-white dark:text-black font-semibold rounded-lg text-xs md:text-base transition-colors duration-300"
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
              <div className="space-y-4 h-[60vh] overflow-y-scroll custom-scrollbar">
                {filterData.length > 0 ? (
                  filterData.map((user) => (
                    <div key={user.id}>
                      <Card id={user.id} name={user.name} email={user.email} />
                    </div>
                  ))
                ) : (
                  <div className="font-semibold">No user found...</div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4 h-[60vh] overflow-y-scroll custom-scrollbar">
              {transactions.length > 0 ? (
                <ul className="space-y-4">
                  {transactions.map((transaction) => (
                    <li
                      key={transaction.id}
                      className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {transaction.sender.email === myData?.email ? (
                            <ArrowUpRight className="text-red-500" />
                          ) : (
                            <ArrowDownLeft className="text-green-500" />
                          )}
                          <div>
                            <p className="font-semibold capitalize">
                              {transaction.sender.email === myData?.email
                                ? `To: ${transaction.receiver.name}`
                                : `From: ${transaction.sender.name}`}
                            </p>
                            <p className="text-neutral-300 text-xs md:text-sm">
                              {transaction.sender.email === myData?.email
                                ? `${transaction.receiver.email}`
                                : `${transaction.sender.email}`}
                            </p>
                            <p className="text-sm mt-2 text-neutral-500">
                              {new Date(transaction.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`font-bold ${
                            transaction.sender.email === myData?.email
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {transaction.sender.email === myData?.email
                            ? "-"
                            : "+"}
                          ${transaction.amount}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="font-semibold">No transactions found...</div>
              )}
            </div>
          )}
        </div>
        <DashboardFooter />
      </main>
    </div>
  );
}
