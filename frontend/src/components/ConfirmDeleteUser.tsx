import axios from "axios";
import Button from "./Button";
import { SERVER_URL } from "../config";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ConfirmDeleteUser = ({ onClick }: { onClick: () => void }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const removeUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")?.split(" ")[1];
      await axios.post(
        `${SERVER_URL}/api/v1/user/remove`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("profileData");
      navigate("/signup");
    } catch (error) {
      setLoading(false);
      setError("Failed to Delete Account");
    }
  };

  return (
    <div className="bg-black w-screen bg-opacity-80 h-screen flex items-center justify-center">
      <AnimatePresence>
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
          {error && (
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-red-600 text-sm bg-red-200 rounded-md py-2 font-semibold text-center"
            >
              {error}
            </motion.p>
          )}
          <Button
            classname="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            label={loading ? "Deactivating..." : "Deactivate"}
            onClick={removeUser}
            disabled={loading}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConfirmDeleteUser;
