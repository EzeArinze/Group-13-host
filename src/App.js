import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Playlist from "./Pages/Playlist";
import Favorite from "./Pages/Favorite";
import MediaTracking from "./Pages/MediaTracking";
import VerificationPage from "./Pages/VerificationPage";
import Dashboard from "./Pages/Dashboard";
import "./App.css";

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
          <Route path="Playlist" element={<Playlist />} />
          <Route path="Favorite" element={<Favorite />} />
          <Route path="MediaTracking" element={<MediaTracking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
