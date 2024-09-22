import axios from "axios";
import Button from "./Button";
import { SERVER_URL } from "../config";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const ConfirmDeleteUser = ({ onClick }: { onClick: () => void }) => {
  const navigate = useNavigate();
  const removeUser = async () => {
    try {
      await axios.post(
        `${SERVER_URL}/api/v1/user/remove`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <div className="bg-black w-screen bg-opacity-80 h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="dark:bg-neutral-900 px-4 mx-4 text-neutral-950 dark:text-white bg-neutral-100 p-6 rounded-md"
        >
          <div className="flex justify-between gap-4 md:gap-8">
            <h1 className=" md:text-xl font-semibold">
              Are you sure to delete your Account?
            </h1>
            <div className="font-semibold cursor-pointer" onClick={onClick}>
              <X />
            </div>
          </div>
          <p className="text-sm text-center mb-10">This cannot be reverted.</p>
          <Button
            classname="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            label="Deactivate"
            onClick={removeUser}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmDeleteUser;
