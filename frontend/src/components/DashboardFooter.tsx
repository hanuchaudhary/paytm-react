import { ArrowUpRight, CreditCard, LogOut, Shield } from "lucide-react";
import React from "react";

const DashboardFooter = () => {
  return (
    <div>
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-300">
            <ArrowUpRight className="h-8 w-8 mb-2 text-blue-500" />
            <span>Send Money</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-300">
            <CreditCard className="h-8 w-8 mb-2 text-blue-500" />
            <span>Pay Bill</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-300">
            <Shield className="h-8 w-8 mb-2 text-blue-500" />
            <span>Security</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-300">
            <LogOut className="h-8 w-8 mb-2 text-blue-500" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
