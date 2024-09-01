import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import SwitchRoute from "../components/SwitchRoute";

const Signin = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="relative m-6 p-8 space-y-8 bg-black bg-opacity-70 border border-zinc-500 shadow-md">
        <Link to={"/"} className="absolute top-3 right-5">
          <h1 className="text-4xl font-semibold ">×</h1>
        </Link>
        <div className="text-center">
          <h1 className="text-4xl font-bold">Signin</h1>
          <p className="mt-4 text-gray-400">
            Access exclusive rewards, manage your payments, and much more.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <Input label={"email"} placeholder={"Enter your email"} />
          <Input label={"password"} placeholder={"Enter your password"} />
          <div className="flex items-center justify-center">
            <Button value={"Login"} />
          </div>
        </form>

        <div className="text-center mt-6">
          <SwitchRoute
            label={"Signup"}
            to={"/signup"}
            title={"Don't have an account?"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
