import {
  CreditCard,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Facebook,
  Twitter,
  Github,
} from "lucide-react";
import { Link } from "react-router-dom";
import { WavyBackground } from "../components/ui/wavy-background";
import LandingNavbar from "../components/LandingNavbar";
import { motion } from "framer-motion";

export default function LandingPage() {
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
    <div className="min-h-screen overflow-hidden relative transition-colors duration-500 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
      <div>
        <LandingNavbar />
      </div>
      <div className="">
        <WavyBackground className="max-w-4xl mx-auto pb-40">
          <p className="text-3xl px-4 md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
            Simplifying payments for everyone.
          </p>
          <p className="text-sm px-4 md:text-lg mt-8 text-white font-normal inter-var text-center">
            Join thousands of satisfied users and start using PayEase today.
          </p>
          <div className="flex items-center justify-center py-4">
            <Link to={"/signup"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-1 border-blue-400 bg-gradient-to-br from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                Get Started
              </motion.div>
            </Link>
          </div>
        </WavyBackground>
      </div>
      <main>
        <section
          id="features"
          className="py-20 bg-white transition-colors duration-500 dark:bg-neutral-950"
        >
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
      </main>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        // whileHover={{scale : 0.55}}
        transition={{ duration: 1 }}
        className="py-20 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to simplify your payments?
          </h2>
          <p className="mb-8 text-xl">
            Join thousands of satisfied users and start using PayEase today.
          </p>
          <Link
            to={"/signup"}
            className="bg-white text-indigo-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-neutral-100 transition duration-300 inline-flex items-center"
          >
            Sign Up Now <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </motion.section>
      <footer className="dark:bg-neutral-950 bg-neutral-100 text-neutral-950 dark:text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">rePAY</h3>
              <p className="text-neutral-800">
                Simplifying payments for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-neutral-800 hover:text-white transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" hover:text-white transition duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" hover:text-white transition duration-300"
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
                    className=" hover:text-white transition duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" hover:text-white transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" hover:text-white transition duration-300"
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
                  className=" hover:text-white transition duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook />
                </a>
                <a
                  href="#"
                  className=" hover:text-white transition duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter />
                </a>
                <a
                  href="#"
                  className=" hover:text-white transition duration-300"
                >
                  <span className="sr-only">GitHub</span>
                  <Github />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-700 pt-8 text-center ">
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
    <div className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}
