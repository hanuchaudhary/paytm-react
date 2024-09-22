import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Landing />
              </PageTransition>
            }
          />
          <Route
            path="/signup"
            element={
              <PageTransition>
                <Signup />
              </PageTransition>
            }
          />
          <Route
            path="/signin"
            element={
              <PageTransition>
                <Signin />
              </PageTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
    initial={{ opacity: 0, filter: "blur(20px)" }} 
    animate={{ opacity: 1, filter: "blur(0px)" }}  
    exit={{ opacity: 0, filter: "blur(20px)" }}    
    transition={{ duration: 0.2 }}  
    >
      {children}
    </motion.div>
  );
};

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default WrappedApp;
