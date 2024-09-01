import React from "react";
import Input from "../components/Input"; // Assuming you have a reusable Input component
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

const SendMoney = ({ username = "username", balance = 199 }) => {
  const [searchParams] = useSearchParams();
  const id  =  searchParams.get("id");
  const name  = searchParams.get("name") 

  return (
    <div className="min-h-screen bg-black bg-opacity-70 text-white flex items-center justify-center">
      <div className="w-full max-w-md border border-zinc-600 bg-zinc-800 p-6 rounded-none shadow-md">
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-2xl font-semibold ">Send Money</h1>
        </div>
        <div className="flex items-center mb-6">
          <div className="bg-zinc-600 text-white h-12 w-12 flex items-center justify-center rounded-full mr-4">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            {/* <p className="text-sm text-gray-400">Balance: ${}</p> */}
          </div>
        </div>

        <section className="mb-6">
          <Input
            label={"Amount to Send"}
            placeholder={"Enter amount"}
            type={"number"}
          />
        </section>

        <div className="flex items-center justify-center">
          <Button value={"Initiate Transfer"} />
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
