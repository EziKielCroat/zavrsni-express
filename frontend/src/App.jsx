import { BrowserRouter, Routes,Route } from "react-router-dom";

const RequireAuthentication = () => {

  return true;
};

const RequireAuthorization = () => {

  return true;
};

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<RequireAuthentication />}> 
        <Route path="/" element={<Home />}/>
        <Route path="/aboutus" element={<AboutUs />}/>
        <Route path="/donations" element={<Donations />}/>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Route>

      <Route element={<RequireAuthorization />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
