import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney isOpen={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
