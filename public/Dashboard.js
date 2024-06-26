// import { useState } from "react";
import NavBar from "../Components/NavBar";
import "../Pages/Dashboard.css";
import Card from "../Components/Card";
import Modal from "../Components/Modal";
import { useState } from "react";

function Dashboard() {
  return (
    <div className="dashboard">
      <NavBar />
      <Menu />
    </div>
  );
}

function Menu() {
  return (
    <div className="dash-main">
      <Description />
      <Recommended />
    </div>
  );
}

function Description() {
  function handlePlaylist() {
    alert("will take you to playlist");
  }

  function handleWatchlist() {
    alert("will take you to Watchlist");
  }

  return (
    <div>
      <h1>Good Morning Fechi</h1>
      <div className="des-container">
        <div>
          <h3>Your Personal Entertainment Hub</h3>
          <p>Keep track of music and movies anywhere, anytime</p>
          <div className="des-button">
            <button onClick={handlePlaylist}>Playlist</button>
            <button onClick={handleWatchlist}>Watchlist</button>
          </div>
        </div>
        <img src="Group-16.png" alt="movie" />
      </div>
    </div>
  );
}

function Recommended() {
  const [showModal, setShowModal] = useState(false);

  function handleAddMusic() {
    alert("card clicked");
  }
  function handleAddMovie() {
    alert("card clicked");
  }
  function handleIntegrate() {
    setShowModal(true);
  }

  return (
    <div>
      <h2>Recommended To Do</h2>
      <div className="recomend">
        <Card backgroundImage="../Frame1438.png">
          <h3>Add music manually</h3>
          <span onClick={handleAddMusic}>&#43;</span>
        </Card>
        <Card backgroundImage="../Frame438.png">
          <h3>Add movies manually</h3>
          <span onClick={handleAddMovie}>&#43;</span>
        </Card>
        <Card backgroundImage="../Frame143.png">
          <h3>Integrate with a platform</h3>
          <span onClick={handleIntegrate}>&#43;</span>
        </Card>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Dashboard;
