import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/transfer",
        {
          to: id,
          amount: amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/user");
      // Optionally add success feedback
    } catch (error) {
      console.error("Error during the transfer:", error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-70 text-white flex items-center justify-center">
      <div className="w-full relative max-w-md border border-zinc-600 bg-zinc-800 p-6 rounded-none shadow-md">
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-2xl font-semibold">Send Money</h1>
        </div>
        <div className="flex items-center mb-6">
          <div className="bg-zinc-600 text-white h-12 w-12 flex items-center justify-center rounded-full mr-4">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
        </div>

        <section className="mb-6">
          <Input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            label={"Amount to Send"}
            placeholder={"Enter amount"}
            type={"number"}
          />
        </section>

        <div className="flex items-center justify-center">
          <Button value={"Initiate Transfer"} onClick={handleOnClick} />
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
