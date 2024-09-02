import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [filter, setFilter] = useState(""); //for filter users
  const [balance, setBalance] = useState(0); //for balance fetching
  const [users, setUsers] = useState([]); //for map list of users
  const [menu, setMenu] = useState(false); //for toggle logout btn

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
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
      .catch((error) => console.error("Error fetching balance:", error));
  }, [filter]);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleOnClick = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-30 text-white">
      <nav className=" bg-zinc-800 p-4 px-20 flex justify-between items-center">
        <div className="text-xl font-bold">Paytm</div>
        <div onClick={toggleMenu} className="flex relative cursor-pointer items-center">
          <div className="bg-zinc-600 cursor-pointer text-white h-8 w-8 flex items-center justify-center rounded-full capitalize">
            {name.charAt(0)}
          </div>
          <span className="ml-2 capitalize">{name}</span>
          {menu && (
            <div className="absolute top-14 -left-5">
              <Button onClick={handleOnClick} to={"/signin"} value={"Logout"} />
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <section className="bg-zinc-800 p-6 rounded-none shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
          <p className="text-4xl font-semibold">${balance.toFixed(2)}</p>
        </section>

        <section className="bg-zinc-800 p-6 rounded-none shadow-md mb-6">
          <Input
            onChange={(e) => setFilter(e.target.value)}
            label={"Search user"}
            placeholder={"Search by username"}
          />
        </section>

        <section className="bg-zinc-800 p-6 rounded-none shadow-md">
          <h2 className="text-2xl font-bold mb-4">All Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className="flex items-center p-3 border-b border-zinc-700"
              >
                <div className="bg-zinc-600 text-white h-8 w-8 flex items-center justify-center rounded-full mr-3">
                  {user.firstName.charAt(0)}
                </div>
                <span className="flex-grow">{user.firstName}</span>
                <Button
                  to={`/send?id=${user._id}&name=${user.firstName}`}
                  value={"Send Money"}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
