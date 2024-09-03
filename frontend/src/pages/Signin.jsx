import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import SwitchRoute from "../components/SwitchRoute";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onClickHandler = async () => {
    setLoading(true);
    setError(""); // Reset error before attempting sign-in
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard?name=" + response.data.User.firstName);
    } catch (error) {
      setError("Failed to connect to the server. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="relative m-6 p-8 space-y-8 bg-black bg-opacity-70 border border-zinc-500 shadow-md">
        <Link to={"/"} className="absolute top-3 right-5">
          <h1 className="text-4xl font-semibold">×</h1>
        </Link>
        <div className="text-center">
          <h1 className="text-4xl font-bold">Signin</h1>
          <p className="mt-4 text-gray-400">
            Access exclusive rewards, manage your payments, and much more.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center mt-8">
            <div className="loader">
              <Loader/>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"email"}
              placeholder={"Enter your email"}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={"password"}
              placeholder={"Enter your password"}
            />
            <div className="flex items-center justify-center">
              <Button value={"Login"} onClick={onClickHandler} />
            </div>
          </form>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-600 text-white rounded-md text-center">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
            >
              Retry
            </button>
          </div>
        )}

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
