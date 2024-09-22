import { useState, useEffect } from "react";
import {
  CreditCard,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Moon,
  Sun,
  Facebook,
  Twitter,
  Github,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const featureCardData = [
    {
      icon: <CreditCard className="h-10 w-10 text-indigo-500" />,
      title: "Easy Payments",
      description: "Send and receive money instantly with just a few taps.",
    },
    {
      icon: <Shield className="h-10 w-10 text-indigo-500" />,
      title: "Secure Transactions",
      description: "Bank-level encryption keeps your money and data safe.",
    },
    {
      icon: <Zap className="h-10 w-10 text-indigo-500" />,
      title: "Lightning Fast",
      description: "Experience quick transfers and real-time updates.",
    },
    {
      icon: <Globe className="h-10 w-10 text-indigo-500" />,
      title: "Global Reach",
      description: "Send money internationally with competitive rates.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
      <header className="bg-white dark:bg-neutral-800 shadow-md py-4 fixed w-full z-10">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold">PayEase</div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#features"
              className="hover:text-indigo-500 transition duration-300"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-indigo-500 transition duration-300"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="hover:text-indigo-500 transition duration-300"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition duration-300"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            <Link
              to={"/signup"}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Simplify Your Payments with PayEase
            </h1>
            <p className="text-xl mb-8 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Send money, pay bills, and manage your finances with ease. All in
              one secure app.
            </p>
            <Link
              to={"/signup"}
              className="bg-indigo-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-600 transition duration-300 inline-flex items-center"
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
        <section id="features" className="py-20 bg-white dark:bg-neutral-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCardData.map((item, idx) => (
                <div className="hover:scale-105 transition-transform">
                  <FeatureCard
                    description={item.description}
                    icon={item.icon}
                    title={item.title}
                    key={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to simplify your payments?
            </h2>
            <p className="mb-8 text-xl">
              Join thousands of satisfied users and start using PayEase today.
            </p>
            <a
              href="#"
              className="bg-white text-indigo-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-neutral-100 transition duration-300 inline-flex items-center"
            >
              Sign Up Now <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PayEase</h3>
              <p className="text-neutral-400">
                Simplifying payments for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition duration-300"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook />
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter />
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition duration-300"
                >
                  <span className="sr-only">GitHub</span>
                  <Github />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-700 pt-8 text-center text-neutral-400">
            <p>&copy; 2023 PayEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface featureInterface {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: featureInterface) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-700 p-6 rounded-lg text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}
