import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import BottomAuth from '../components/BottomAuth'
import Button from '../components/Button'
import Forgot from '../components/Forgot'

const SignIn  = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign-in logic here
    console.log('Sign in attempted with:', { email, password })
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-neutral-400 hover:text-neutral-500 focus:outline-none focus:text-neutral-500"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-neutral-300 rounded dark:border-neutral-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900 dark:text-neutral-300">
                  Remember me
                </label>
              </div>

              <Forgot/>
            </div>

           <Button/>
          </form>
          <BottomAuth to={"/signup"} label={"Don't have an account?"} title={" Signup"} />
        </div>
      </main>

      <footer className="bg-white dark:bg-neutral-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            &copy; 2023 Your Company. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300">
              Terms
            </a>
            <a href="#" className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SignIn