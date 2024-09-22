import { X } from "lucide-react";
import { SERVER_URL } from "../config";
import axios from "axios";
import { useState } from "react";

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
  const numAmount = Number(amount);
  const handleSendMoney = async () => {
    if (numAmount <= 0 || isNaN(Number(amount))) {
      console.error("Invalid amount");
      return;
    }
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Success:", response.data);
      onClose();
    } catch (error) {
      console.error("Error sending money", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 bg-black h-screen w-screen z-50 flex items-center justify-center bg-opacity-85">
      <div className="bg-white dark:bg-neutral-800 dark:text-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold capitalize">Send Money to {name}</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-neutral-600 hover:text-neutral-500" />
          </button>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-600 p-4 rounded-lg flex items-center my-4">
          <div className="capitalize bg-blue-500 text-white font-bold h-12 w-12 rounded-full flex justify-center items-center mr-4">
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
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;
