import { motion } from "framer-motion";

interface buttonInterface {
  classname?: string;
  label: string;
  onClick?: () => Promise<void> | void;
  disabled?: boolean; 
}
const Button = ({ onClick, label, classname ,disabled }: buttonInterface) => {
  return (
    <div>
      <motion.button
        whileHover={{scale : 1.05}}
        whileTap={{scale : 0.95}}
        disabled={disabled}
        onClick={onClick}
        className={`group ${classname} relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {label}
      </motion.button>
    </div>
  );
};

export default Button;
