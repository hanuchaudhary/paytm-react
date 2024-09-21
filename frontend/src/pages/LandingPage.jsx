import React from "react";
import FeatureCard from "../components/FeatureCard";
import Button from "../components/Button";
import {
  FaLock,
  FaMobileAlt,
  FaUserFriends,
  FaRegCreditCard,
} from "react-icons/fa";
import { IoLogInSharp } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa6";

const LandingPage = () => {
  const features = [
    {
      icon: <FaLock size={40} />,
      title: "Secure Transactions",
      description:
        "All transactions are encrypted with state-of-the-art security protocols.",
    },
    {
      icon: <FaMobileAlt size={40} />,
      title: "Mobile Payments",
      description:
        "Make payments easily on the go with our mobile app, available on all platforms.",
    },
    {
      icon: <FaUserFriends size={40} />,
      title: "Peer-to-Peer Transfers",
      description:
        "Send money to friends and family instantly and without any fees.",
    },
    {
      icon: <FaRegCreditCard size={40} />,
      title: "Multiple Payment Options",
      description:
        "Use a variety of payment methods including credit cards, bank transfers, and digital wallets.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen  text-white">
      <header className=" p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">PayNow</div>
          <ul className="space-x-6 hidden md:flex">
            <li>
              <a href="#features" className="hover:text-gray-400">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
          <Button to={"./signup"} value={"Sign up"} />
        </nav>
        <div className="container mx-auto text-center mt-10">
          <h1 className="text-4xl flex items-center justify-center gap-2 font-bold">
            {"Fast, Secure Payments Made Easy".split(" ").map((e) => (
              <p className="hover:text-orange-300 transition-colors duration-300 select-none">{e}</p>
            ))}
          </h1>
          <p className="mt-4 mb-8 text-lg ">
            Join thousands of users who trust PayNow for their daily
            transactions.
          </p>
          <div className="flex items-center justify-center">
            <Button value={"Get Started"} />
          </div>
        </div>
      </header>

      <h1 className="text-center font-semibold text-3xl py-8 mt-24">
        Features
      </h1>
      <div className="grid gap-8 px-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <section id="about" className=" py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            PayNow is a leading payment solution that simplifies your financial
            transactions. We are committed to providing a seamless experience
            with top-notch security and speed.
          </p>
        </div>
      </section>

      <footer className=" py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p className="text-gray-500">
            &copy; 2024 PayNow. All rights reserved.
          </p>
          <ul className="flex space-x-6 text-gray-500">
            <li>
              <a href="#privacy" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-gray-300">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
