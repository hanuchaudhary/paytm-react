import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Transaction, useProfile } from "../Hooks/Hooks";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { myData } = useProfile();
  return (
    <div>
      <li
        key={transaction.id}
        className="bg-neutral-100 hover:bg-neutral-200/80 dark:hover:bg-neutral-600 transition-colors dark:bg-neutral-700 p-4 rounded-lg shadow-sm  duration-300"
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
                  ? transaction?.receiver?.email ?? "deleteduser@gmail.com"
                  : transaction?.sender?.email ?? "deleteduser@gmail.com"}
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
              {transaction.sender.email === myData?.email ? "-" : "+"}₹
              {transaction.amount}
            </div>
            <div className="md:flex gap-2">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {new Date(transaction?.timestamp).toLocaleDateString()}{" "}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {new Date(transaction?.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              </p>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
