import { CreditCard, RefreshCcw, Shield } from "lucide-react";
import { useGetBalance } from "../Hooks/Hooks";
import Spinner from "./Spinner";
import { motion } from "framer-motion";

const DisplayCards = () => {
  const { balance, loading, fetchBalance } = useGetBalance();

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-6 shadow-lg relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-purple-200">Total Balance</p>
            {loading ? (
              <Spinner label="Fetching your Balance" />
            ) : (
              <h2 className="text-4xl py-2 font-bold text-white">
                ${balance.toFixed(2)}
              </h2>
            )}
          </div>
          <CreditCard className="h-8 w-8 text-purple-200" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-purple-200">
            Auto-updating after 20-Seconds
          </p>
          <motion.p
            onClick={fetchBalance}
            whileTap={{ rotate: 1080 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            <RefreshCcw />
          </motion.p>
        </div>
      </div>

      <div className="bg-gradient-to-br md:block hidden from-green-500 to-teal-400 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-green-100">Authorization Status</p>
            <h2 className="text-3xl font-bold text-white">Verified</h2>
          </div>
          <Shield className="h-8 w-8 text-green-100" />
        </div>
        <p className="text-sm text-green-100">
          Your account is fully authorized
        </p>
      </div>
    </div>
  );
};

export default DisplayCards;
