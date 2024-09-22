import { X } from "lucide-react";
import { SERVER_URL } from "../config";
import axios from "axios";
import { useState } from "react";
import TransactionCompleted from "../components/TransactionCompleted";
import { AnimatePresence, motion } from "framer-motion";

interface SendMoneyModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
}

const SendMoneyModal = ({
  id,
  isOpen,
  onClose,
  name,
  email,
}: SendMoneyModalProps) => {
  const [amount, setAmount] = useState<number | string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const numAmount = Number(amount);

  const handleSendMoney = async () => {
    if (numAmount <= 0 || isNaN(numAmount)) {
      setError("Please enter a valid amount.");
      return;
    }
    setError(null);
    try {
      await axios.post(
        `${SERVER_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: numAmount,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error: any) {
      setError("Error sending money. " + error.response.data.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 bg-black h-screen w-screen z-50 flex items-center justify-center bg-opacity-85">
        {success ? (
          <h1 className="text-xl font-semibold text-green-500">
            <TransactionCompleted
              amount={numAmount}
              recipient={name}
              onAnimationComplete={handleSendMoney}
            />
          </h1>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white mx-4 p-4 dark:bg-neutral-800 dark:text-white rounded-lg w-full max-w-md md:p-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold capitalize">
                Send Money to {name}
              </h2>
              <button onClick={onClose}>
                <X className="h-6 w-6 text-neutral-600 hover:text-neutral-500" />
              </button>
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded-lg my-4">
                {error}
              </div>
            )}

            <div className="bg-neutral-100 dark:bg-neutral-600 p-4 rounded-lg flex items-center my-4">
              <div className="capitalize bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold h-12 w-12 rounded-full flex justify-center items-center mr-4">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-lg font-semibold capitalize">{name}</h3>
                <p className="text-neutral-400">{email}</p>
              </div>
            </div>

            <div className="my-4">
              <label htmlFor="amount" className="block text-sm font-medium">
                Amount
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                id="amount"
                placeholder="Enter amount"
                className="mt-1 w-full px-4 dark:bg-neutral-700 py-2 border dark:border-neutral-600 rounded-lg shadow-sm focus:ring-0"
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleSendMoney}
                className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Send Money
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default SendMoneyModal;
