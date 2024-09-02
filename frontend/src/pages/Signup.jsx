import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import SwitchRoute from "../components/SwitchRoute";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = async () => {
    console.log("click");
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email,
        firstName,
        lastName,
        password,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      
      navigate("/dashboard?name=" + response.data.user.firstName);
      console.log("Sign up successful");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="relative  p-4 md:p-8 m-10 bg-black bg-opacity-70 border border-zinc-500 shadow-md">
        <Link to={"/"} className="absolute top-3 right-5">
          <h1 className="text-4xl font-semibold ">×</h1>
        </Link>
        <div className="text-center">
          <h1 className="text-xl md:text-4xl font-bold">Signup</h1>
          <p className="md:mt-4 mt-2 text-sm md:text-lg  text-gray-400">
            Access exclusive rewards, manage your payments, and much more.
          </p>
        </div>

        <form className="md:mt-8 mt-4 flex flex-col gap-4 md:gap-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"email"}
            placeholder={"Enter your email"}
          />
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label={"first name"}
            placeholder={"Enter your first name"}
          />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label={"last name"}
            placeholder={"Enter your last name"}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"password"}
            placeholder={"Enter your password"}
          />
          <div className="flex items-center justify-center">
            <Button onClick={handleOnClick} value={"Signup"} />
          </div>
        </form>

        <div className="text-center mt-6">
          <SwitchRoute
            label={"Signin"}
            to={"/signin"}
            title={"Already have an account?"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
