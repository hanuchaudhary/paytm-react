import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { X } from "lucide-react";
import { SERVER_URL } from "../config";
import { useProfile } from "../Hooks/Route";

const EditUserDetails = ({ onClick }: { onClick: () => void }) => {
  const { myData } = useProfile();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: myData?.name || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateUser = async () => {
    if (!formData.name) {
      setError("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${SERVER_URL}/api/v1/user/update`,
        { name: formData.name, password: formData.password },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update details");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="bg-black w-screen bg-opacity-80 h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="dark:bg-neutral-900 px-4 mx-4 text-neutral-950 dark:text-white bg-neutral-100 p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between gap-4 mb-4">
            <div className="flex flex-col">
              <h1 className="md:text-xl font-semibold">Edit User Details</h1>
              <h2 className="text-sm font-semibold text-neutral-400">
                {myData?.email}
              </h2>
            </div>
            <div className="font-semibold cursor-pointer" onClick={onClick}>
              <X />
            </div>
          </div>
          <div className="space-y-4">
              {error && (
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="text-red-600 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            <div>
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter your new password"
              />
            </div>
            <div className="mt-6">
              <Button
                classname="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                label={loading ? "Updating..." : "Update"}
                onClick={handleUpdateUser}
                // disabled={loading}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditUserDetails;
