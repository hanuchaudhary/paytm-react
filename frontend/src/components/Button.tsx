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
        whileHover={{scale : 1.03}}
        whileTap={{scale : 0.97}}
        disabled={disabled}
        onClick={onClick}
        className={`group ${classname} relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:bg-neutral-200 dark:border-neutral-600 dark:text-black text-white border-neutral-600 bg-neutral-900`}
      >
        {label}
      </motion.button>
    </div>
  );
};

export default Button;
