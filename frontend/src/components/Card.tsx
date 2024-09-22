import { useState } from "react";
import SendMoneyModal from "../pages/SendMoney";

interface cardInterface {
  id: string;
  name: string;
  email: string;
  onClick?: () => void;
}

const Card = ({ name, email, id }: cardInterface) => {
  const [close, setClose] = useState(false);

  return (
    <div>
      <SendMoneyModal
        id={id}
        email={email}
        name={name}
        isOpen={close}
        onClose={() => setClose(false)}
      />
      <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white uppercase font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-semibold capitalize">{name}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {email}
            </p>
          </div>
        </div>
        <button
          onClick={() => setClose(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default Card;
