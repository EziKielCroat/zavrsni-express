import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Donations from "./Components/Donations/Donations";
import Notifications from "./Components/Notifications/Notifications";
import AccountSettings from "./Components/AccountSettings/AccountSettings";
import Dashboard from "./Components/Dashboard/Dashboard";

const queryClient = new QueryClient();

const RequireAuthentication = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RequireAuthorization = ({ children }) => {
  const {
    data: isAuthorized,
    isLoading,
    isError,
  } = useQuery(
    "authorization",
    async () => {
      const response = await axiosInstance.get(`/protected-route`);
      return response.data;
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/login" />;

  return isAuthorized ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <RequireAuthentication>
                <Home />
              </RequireAuthentication>
            }
          />
          <Route
            path="/aboutus"
            element={
              <RequireAuthentication>
                <AboutUs />
              </RequireAuthentication>
            }
          />
          <Route
            path="/donations"
            element={
              <RequireAuthentication>
                <Donations />
              </RequireAuthentication>
            }
          />
          <Route
            path="/notifications"
            element={
              <RequireAuthentication>
                <Notifications />
              </RequireAuthentication>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuthentication>
                <AccountSettings />
              </RequireAuthentication>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuthorization>
                <Dashboard />
              </RequireAuthorization>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
