import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import { WavyBackground } from "../components/ui/wavy-background";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import LandingNavbar from "../components/LandingNavbar";
import { SparklesCore } from "../components/ui/sparkles";
import { TypewriterEffect } from "../components/ui/typewriter-effect";


const subHeading = [
  {
    text: "Join",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "thousands",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "of",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "satisfied",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "users",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "and",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "start",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "using",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
  {
    text: "PayEase",
    className: "text-blue-500 dark:text-blue-500 text-base md:text-lg font-normal tracking-tight leading-none",
  },
  {
    text: "today",
    className : "text-base md:text-lg font-normal tracking-tight leading-none"
  },
];

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

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden relative transition-colors duration-500 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans">
      <LandingNavbar />
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <div className="lg:pt-40 pt-40">
          <TextGenerateEffect
          duration={2.5}
            words="Simplifying payments for everyone."
            className="dark:text-white font-bold inter-var text-center"
          />
        </div>
        <div className="px-10 py-5 lg:py-5">
          <TypewriterEffect cursorClassName="hidden" words={subHeading}/>
        </div>
        <div className="flex items-center justify-center py-4">
          <Link to="/signup">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-indigo-500 shadow-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300 text-lg font-semibold"
            >
              Get Started
            </motion.div>
          </Link>
        </div>
      </WavyBackground>

      <main>
        <section
          id="features"
          className="py-20 bg-white transition-colors duration-500 dark:bg-black"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCardData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <FeatureCard {...item} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="py-20 text-white bg-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to simplify your payments?
          </h2>
          <p className="mb-8 text-xl">
            Join thousands of satisfied users and start using PayEase today.
          </p>
          <Link
            to="/signup"
            className="bg-white text-indigo-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-neutral-100 transition duration-300 inline-flex items-center"
          >
            Sign Up Now <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      <footer className="dark:bg-neutral-950 bg-neutral-100 text-neutral-950 dark:text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">rePAY</h3>
              <p className="text-neutral-800 dark:text-neutral-200">
                Simplifying payments for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
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
                    className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
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
                  className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook />
                </a>
                <a
                  href="#"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter />
                </a>
                <a
                  href="#"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
                >
                  <span className="sr-only">GitHub</span>
                  <Github />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-700 pt-8 text-center">
            <p>&copy; 2023 PayEase. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={10}
        className="w-full h-full absolute top-0 left-0 pointer-events-none"
      />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg text-white bg-neutral-900 hover:scale-105 transition-transform duration-500 text-center h-full">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}
