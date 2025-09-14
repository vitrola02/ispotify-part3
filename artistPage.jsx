import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const responseSongs = await api.get(`/api/songs/artist/${id}`);
        setSongs(responseSongs.data);

        const responseArtist = await api.get(`/api/artists/${id}`);
        setArtist(responseArtist.data);
      } catch (error) {
        console.error("Erro ao carregar músicas/artista", error);
      }
    };
    fetchSongs();
  }, [id]);

  const handleLogout = async () => {
        try {
            await api.post ("http://localhost:3030/api/users/logout");
            window.location.href = "/login";
        }catch (error) {
            console.error("Eroo ao deslogar", error);
        }
    };

  const handleLike = async (songId) => {
    try {
      await api.post(`/api/users-songs/${songId}`);
      alert("Música adicionada as curtidas!");
    } catch (error) {
      console.error("Erro ao curtir musica", error);
    }
  };

  return (
    <div className='page'>
      
      <div className="corner">
        <div className="name">iSpotify ®</div>
        <button className="artists" id="button" onClick={() => navigate("/mainpage")}><img src="src/images/artists-icon.png" id="icon" alt="radio" width="16" height="16" />Artistas</button>
        <button className="liked-songs" id="button" onClick={() => navigate("/likedsongs")}><img src="src/images/favorite-icon.svg" id="icon" alt="heart" width="16" height="16" />Músicas Curtidas</button>
        <button className="minha-conta" id="button" onClick={() => navigate("/minhaconta")}><img src="src/images/minha-conta.svg" id="icon" alt="perfil" width="16" height="16" />Minha Conta</button>
        <button className="logout" id="button" onClick={handleLogout}><img src="src/images/logout-icon.svg" id="icon" alt="door" width="16" height="16" />Logout</button>
      </div>

      <div className="artist-page">
        /* Cabeçalho do artista 
        <div className="artist-header">
          <img src={artist?.image} alt={artist?.name} className="artist-image"/>
          <div className="artist-info">
            <h1>{artist?.name}</h1>
            <span className="subtitle">{artist?.nationality}</span>
          </div>
        </div>


        <div className="artist-songs-title">Músicas</div>


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
            {songs.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.title}</td>
                <td>{s.genre}</td>
                <td className="song-actions">
                  <button className="play-btn" /*onClick={() => handlePlay(s)}*/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <button
                    className={`like-btn ${false ? 'liked' : ''}`} // Você pode adicionar estado para ver se já foi curtido
                    onClick={() => handleLike(s.id)}
                  >
                    ❤️
                  </button>
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
