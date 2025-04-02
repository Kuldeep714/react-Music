import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { initializePlaylist } from "./initialize";
import { Route, Routes } from "react-router-dom";
import LikedMusic from "./components/LikedMusic";
import Navbar from "./components/Navbar";

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);

  const fetchMusicData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search or retry ");
      }
      const jsonData = await response.json();
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMusicData();
    }
  };

  useEffect(() => {
    initializePlaylist();
    

    // current client credentials will be deleted in few days
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
      />
      <Routes>
        <Route path="/likedMusic" element={<LikedMusic />} />
        <Route path="/" element={<div></div>} />
        <Route exact path="..//" Component={<></>} />

      </Routes>

      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        <div className="row">
          {tracks.map((element) => {
            return <Card key={element.id} element={element} />;
          })}
        </div>

        <div className="row">
          <div className="col">
            <h4 className="text-center text-danger py-2">{message}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12 py-5 text-left">
            <h1>
              <i className="bi bi-music-note-list mx-3"></i>
              Music Player
            </h1>
            <h2>
            
            <i class="bi bi-person-circle mx-3"></i>
             by Kuldeep Singh
             </h2>
            <h3 className="py-5" >
            <i class="bi bi-search mx-3"></i>
              Discover music in 15 seconds</h3>
            <h3 className="py-2">Enjoy the music</h3>
            <h3 className="py-2">Thanks
            <i class="bi bi-emoji-smile-upside-down mx-2"></i>
            </h3>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
