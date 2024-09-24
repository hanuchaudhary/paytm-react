import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const LoginFirst: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-neutral-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold mb-6">Login Required</h2>
        <p className="text-xl mb-8">
          You need to be logged in to access this page.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={"/signin"}>
            <button className="px-6 py-3 text-lg font-semibold text-white bg-neutral-600 rounded-lg shadow-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-75 transition-colors duration-200 ease-in-out dark:bg-neutral-500 dark:hover:bg-neutral-600">
              Go to Login
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}