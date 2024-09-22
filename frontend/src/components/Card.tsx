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
      <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-700 md:p-4 p-3 rounded-lg">
        <div className="flex items-center md:space-x-4 space-x-2">
          <div className="md:w-10 md:h-10 w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 p-4 to-blue-500 flex items-center justify-center text-white uppercase font-bold">
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
          className="md:px-4 px-2 py-2 text-sm md:text-base bg-gradient-to-br from-green-600 to-teal-500 text-white rounded-lg hover:from-teal-600 hover:to-green-500 transition-colors duration-500"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default Card;
