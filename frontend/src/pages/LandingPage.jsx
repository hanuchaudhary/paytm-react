import React from "react";
import FeatureCard from "../components/FeatureCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
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
          <Link to={"/signup"}>
            <Button value={"Sign up"} />
          </Link>
        </nav>
        <div className="container mx-auto text-center mt-10">
          <h1 className="text-4xl font-bold">
            Fast, Secure Payments Made Easy
          </h1>
          <p className="mt-4 mb-8 text-lg ">
            Join thousands of users who trust PayNow for their daily
            transactions.
          </p>
          <Button value={"Get Started"} />
        </div>
      </header>

      <section id="features" className="container mx-auto my-10 px-4">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          <FeatureCard
            image={
              "https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/scan-n-pay.png"
            }
            title={"scan & pay any UPI QR"}
          />
          <FeatureCard
            image={
              "https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/scan-n-pay.png"
            }
            title={"scan & pay any UPI QR"}
          />
          <FeatureCard
            image={
              "https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/scan-n-pay.png"
            }
            title={"UPI payments on credit"}
          />
          <FeatureCard
            image={
              "https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/scan-n-pay.png"
            }
            title={"Send Money to any UPI app"}
          />
        </div>
      </section>

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
