

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function LikedSongsPage() {
  const [likedSongs, setLikedSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const userResponse = await api.get("/api/users/user");
        const response = await api.get(`/api/users-songs/users/${userResponse.data.id}`);
        setLikedSongs(response.data);
      } catch (error) {
        console.error("Erro ao buscar músicas curtidas", error);
      }
    };
    fetchLikedSongs();
  }, []);

  const handleLogout = async () => {
        try {
            await api.post ("http://localhost:3030/api/users/logout");
            window.location.href = "/login";
        }catch (error) {
            console.error("Eroo ao deslogar", error);
        }
    };

  return (
    <div className="page">

      <div className="corner">
        <div className="name">iSpotify ®</div>
        <button className="artists" id="button" onClick={() => navigate("/mainpage")}><img src="src/images/artists-icon.png" id="icon" alt="radio" width="16" height="16" />Artistas</button>
        <button className="liked-songs" id="button" onClick={() => navigate("/likedsongs")}><img src="src/images/favorite-icon.svg" id="icon" alt="heart" width="16" height="16" />Músicas Curtidas</button>
        <button className="minha-conta" id="button" onClick={() => navigate("/minhaconta")}><img src="src/images/minha-conta.svg" id="icon" alt="perfil" width="16" height="16" />Minha Conta</button>
        <button className="logout" id="button" onClick={handleLogout}><img src="src/images/logout-icon.svg" id="icon" alt="door" width="16" height="16" />Logout</button>
      </div>

      <div className="playlist-page">
        <div className="playlist-header">
          <img
            src="https://via.placeholder.com/120"
            alt="Curtidas"
            className="playlist-image"
          />
          <div className="playlist-info">
            <h1>Curtidas</h1>
            <span className="subtitle">Sua playlist favorita</span>
          </div>
        </div>

        <table className="song-list">
          <thead>
            <tr>
              <th>#</th>
              <th>TÍTULO</th>
              <th>GÊNERO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.title}</td>
                <td>{s.genre}</td>
                <td className="song-actions">
                  <button className="play-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <button className="like-btn liked">❤️</button>
                  <button className="more-btn">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}