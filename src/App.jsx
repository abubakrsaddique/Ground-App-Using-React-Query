import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Login from "./pages/Login/Loginpage";
import Signup from "./pages/Signup/Signuppage";
import Dashboard from "./pages/Dashboard";
import StartUp from "./pages/Startup/Startuppage";
import { AuthContext } from "./context/AuthContext";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading, user } = useContext(AuthContext);

  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Banner />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Startup" element={<StartUp />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
