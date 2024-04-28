import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

const queryClient = new QueryClient();

const RequireAuthentication = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RequireAuthorization = ({ children }) => {
  const { data: isAuthorized, isLoading, isError } = useQuery(
    'authorization',
    async () => {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/protected-route`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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

        <Route path="/" element={<RequireAuthentication><Home /></RequireAuthentication>} />
        {/* <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<AccountSettings />} /> */}
    
        <Route path="/dashboard" element={<RequireAuthorization><Home /></RequireAuthorization>} />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
