import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import Button from "../components/Button";

const Dashboard = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //debouncing ....
    axios
      .get("http://localhost:3000/bulk?filter=" + filter)
      .then((res) => setUsers(res.data.users));
  }, [filter]);

  return (
    <div className="min-h-screen bg-black bg-opacity-30 text-white">
      <nav className="bg-zinc-800 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Paytm</div>
        <div className="flex items-center">
          <div className="bg-zinc-600 text-white h-8 w-8 flex items-center justify-center rounded-full">
            {/* {username.charAt(0)} */}U
          </div>
          <span className="ml-2">user</span>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {/* User Balance Section */}
        <section className="bg-zinc-800 p-6 rounded-none shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
          <p className="text-4xl font-semibold">$5,000</p>
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
                {/* <span className="font-semibold">${user.balance}</span> */}
                <Button
                  to={"/send?id=" + user._id + "&name=" + user.firstName}
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
