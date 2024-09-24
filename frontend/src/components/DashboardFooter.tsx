import { CreditCard, LogOut, Pen, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import EditUserDetails from "./EditUserDetails";

const DashboardFooter = () => {
  const [deactivateMenu, setDeactivateMenu] = useState(false);
  const [editUserDetailsMenu, setEditUserDetailsMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileData");
    navigate("/");
  };

  const handleEditDetailsClick = () => {
    navigate("/dashboard/edit");
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/edit") {
      setEditUserDetailsMenu(true);
    }
  }, [location]);

  const handleCloseEditDetails = () => {
    setEditUserDetailsMenu(false);
    navigate("/dashboard");
  };

  return (
    <div>
      {deactivateMenu && (
        <div className="flex items-center justify-center fixed z-50 top-0 left-0">
          <ConfirmDeleteUser
            onClick={() => setDeactivateMenu((prev) => !prev)}
          />
        </div>
      )}
      {editUserDetailsMenu && (
        <div className="flex items-center justify-center fixed z-50 top-0 left-0">
          <EditUserDetails
            onClick={handleCloseEditDetails} />
        </div>
      )}
      <div className="bg-white transition-colors duration-500 dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={handleEditDetailsClick}
            className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-500"
          >
            <Pen className="h-8 w-8 mb-2 text-indigo-500" />
            <span>Edit Details</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-500">
            <CreditCard className="h-8 w-8 mb-2 text-green-500" />
            <span>Send Money</span>
          </button>
          <button
            onClick={() => setDeactivateMenu((prev) => !prev)}
            className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-500"
          >
            <Trash className="h-8 w-8 mb-2 text-red-500" />
            <span>Deactivate Account</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition duration-500"
          >
            <LogOut className="h-8 w-8 mb-2 text-yellow-500" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
