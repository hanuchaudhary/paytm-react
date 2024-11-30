import { useState } from "react";
import SendMoneyModal from "../pages/SendMoney";
import { motion } from "framer-motion";

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
      <div className="flex items-center justify-between bg-neutral-100  hover:bg-neutral-200/80 transition-colors duration-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 md:p-4 py-3 px-2 rounded-lg">
        <div className="flex items-center md:gap-4 gap-2">
          <div className="md:w-12 md:h-12 w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 p-4 to-blue-500 flex items-center justify-center text-white uppercase font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-semibold capitalize">{name}</p>
            <p className="text-xs md:text-base text-wrap text-neutral-600 dark:text-neutral-400">
              {email}
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          onClick={() => setClose(true)}
          className="md:px-4 px-2 py-2 text-xs border font-semibold md:text-base dark:bg-neutral-200 dark:border-neutral-600 dark:text-black text-white border-neutral-600 bg-neutral-900 rounded-lg transition-colors duration-300"
        >
          Send Money
        </motion.button>
      </div>
    </div>
  );
};

export default Card;
