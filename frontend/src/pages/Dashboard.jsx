import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(""); //for filter users
  const [balance, setBalance] = useState(0); //for balance fetching
  const [users, setUsers] = useState([]); //for map list of users
  const [menu, setMenu] = useState(false); //for toggle logout btn
  const [loading, setLoading] = useState(false); //for toggle logout btn

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); // Redirect to Signin page if not authenticated
      return;
    }
    // Fetch users
    axios
      .get("http://localhost:3000/bulk?filter=" + filter)
      .then((res) => setUsers(res.data.users))
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch balance
    axios
      .get("http://localhost:3000/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => setBalance(response.data.balance))
      .catch((error) => {
        return console.error("Error fetching balance:", error);
      });
  }, [filter]);

  const handleOnClick = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-30 text-white">
      <NavBar/>
      <div className="container mx-auto p-6">
        <section className="bg-neutral-800 p-6 rounded-none shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
          <p className="text-4xl font-semibold">${balance.toFixed(2)}</p>
        </section>

        <section className="bg-neutral-800 p-6 rounded-none shadow-md mb-6">
          <Input
            onChange={(e) => setFilter(e.target.value)}
            label={"Search user"}
            placeholder={"Search by username"}
          />
        </section>

        <section className="bg-neutral-800 p-6 rounded-none shadow-md">
          <h2 className="text-2xl font-bold mb-4">All Users</h2>
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center p-3 border-b border-neutral-700"
                >
                  <div className="bg-neutral-600 text-white h-8 w-8 flex items-center justify-center rounded-full mr-3">
                    {user.firstName.charAt(0)}
                  </div>
                  <span className="flex-grow">{user.firstName}</span>
                  <Button
                    to={`/send?id=${user._id}&name=${user.firstName}`}
                    value={"Send Money"}
                  />
                </li>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <NotFound />
              </div>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
