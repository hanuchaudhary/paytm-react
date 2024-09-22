import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import BottomAuth from "../components/BottomAuth";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface SignupType {
  email: string;
  password: string;
  name: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupInputs, setSignupInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${SERVER_URL}/api/v1/user/signup`,
        signupInputs
      );
      console.log("ceated!!");
      const token = `Bearer ${response.data.token}`;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error: any) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
              Create your account
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className="h-4 w-4 z-10 text-neutral-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    placeholder="Full name"
                    value={signupInputs.name}
                    onChange={(e) =>
                      setSignupInputs({ ...signupInputs, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      className="h-4 w-4 text-neutral-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    placeholder="Email address"
                    value={signupInputs.email}
                    onChange={(e) =>
                      setSignupInputs({
                        ...signupInputs,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className="h-4 w-4 text-neutral-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    placeholder="Password"
                    value={signupInputs.password}
                    onChange={(e) =>
                      setSignupInputs({
                        ...signupInputs,
                        password: e.target.value,
                      })
                    }
                  />
                  <div className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-neutral-400 hover:text-neutral-500 focus:outline-none focus:text-neutral-500"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button onClick={handleSignup} label="Sign up"/>
            </div>
          </div>

          <BottomAuth
            to={"/signin"}
            label={"Already have an account?"}
            title={" Signin"}
          />
        </div>
      </main>

      <footer className="bg-white dark:bg-neutral-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            &copy; 2023 Your Company. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a
              href="#"
              className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
