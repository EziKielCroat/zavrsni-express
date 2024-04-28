import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

const RequireAuthentication = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RequireAuthorization = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchAuthorization = async () => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/protected-route`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        console.log(response);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Authorization failed:", error);
        setIsAuthorized(false);
      }
    };
    fetchAuthorization();
  }, []); 

  return isAuthorized ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<RequireAuthentication><Home /></RequireAuthentication>} />
      {/* <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/donations" element={<Donations />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<AccountSettings />} /> */}
  
      <Route path="/dashboard" element={<RequireAuthorization><Home /></RequireAuthorization>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
