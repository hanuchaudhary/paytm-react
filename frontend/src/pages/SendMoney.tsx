import { X } from "lucide-react";


interface SendMoneyModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const SendMoneyModal = ({ isOpen, onClose } : SendMoneyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Send Money to Charlie Brown</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        <div className="bg-neutral-100 p-4 rounded-lg flex items-center my-4">
          <div className="bg-blue-500 text-white font-bold h-12 w-12 rounded-full flex justify-center items-center mr-4">
            CB
          </div>
          <div>
            <h3 className="text-lg font-semibold">Charlie Brown</h3>
            <p className="text-gray-500">charlie@example.com</p>
          </div>
        </div>

        <div className="my-4">
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            placeholder="Enter amount"
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="text-center">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;
