import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./providers/LocalThemeProvider";
import { useEffect } from "react";
import LandingPage from "./pages/Landing";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathsToRedirect = ["/", "/signup", "/signin"];
    const token = localStorage.getItem("token");
    if (token && pathsToRedirect.includes(location.pathname)) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/edit" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
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
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default WrappedApp;
