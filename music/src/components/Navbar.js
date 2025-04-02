import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Music player ">
          <i className="bi bi-music-note-list mx-3"></i> 
          Music Player   
        </a>  
        
        <div className="dropdown">
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Liked Music
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item text-secondary" href="/">
                All Playlist
              </a>
            </li>
            <li>
              <Link className="dropdown-item" to="/likedMusic">
                Liked Music
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="collapse navbar-collapse d-flex justify-content-center"
          id="navbarSupportedContent"
        >
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyPress}
            className="form-control me-2 w-75"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button onClick={fetchMusicData} className="btn btn-outline-success">
            Search
          </button>
        </div>
      </div>
      
          </nav>
  );
};
export default Navbar;
