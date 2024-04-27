
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

const RequireAuthentication = ({ children }) => {
  console.log(localStorage.getItem("token"));
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RequireAuthorization = ({ children }) => {
  const isAuthorized = true;
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
        
        <Route
          element={<RequireAuthorization />}
        >
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
