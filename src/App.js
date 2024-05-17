import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerificationPage from "./Pages/VerificationPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="VerificationPage" element={<VerificationPage />} />
          <Route path="Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
