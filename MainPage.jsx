
import { useEffect, useState } from 'react'
import api from './api';
import { useNavigate, Link } from "react-router-dom";

export default function MainPage() {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtist = async () => {
        try {
            const response = await api.get('/api/artists');
            setArtists(response.data);
        } catch (error) {
            console.error('Erro ao buscarartistas', error)
        }
        };
        fetchArtist();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post ("http://localhost:3030/api/users/logout");
            window.location.href = "/login";
        }catch (error) {
            console.error("Eroo ao deslogar", error);
        }
    };

    const handleArtistClick = (artistId) => {
      navigate(`/artistpage/${artistId}`);
    };

  return (
     <div className='page'>
      
      <div className="corner">
        <div className="name">iSpotify ®</div>
        <button className="artists" id="button"><img src="src/images/artists-icon.png" id="icon" alt="radio" width="16" height="16" />Artistas</button>
        <button className="liked-songs" id="button" onClick={() => navigate("/likedsongs")}><img src="src/images/favorite-icon.svg" id="icon" alt="heart" width="16" height="16" />Músicas Curtidas</button>
        <button className="minha-conta" id="button" onClick={() => navigate("/minhaconta")}><img src="src/images/minha-conta.svg" id="icon" alt="perfil" width="16" height="16" />Minha Conta</button>
        <button className="logout" id="button" onClick={handleLogout}><img src="src/images/logout-icon.svg" id="icon" alt="door" width="16" height="16" />Logout</button>
      </div>

      <main className="content">
        <h1>Artistas</h1>
        <ul className="card-grid">
          {artists.map(a => (
            <li key={a.id} className='card'>
              <button onClick={ () => handleArtistClick(a.id) } className="card-button">
                <img src={a.image} alt={a.name} className="foto" />
                <div className='card-body'>
                  <h3 className='card-title'>{a.name}</h3>
                  <span className='card-subtitle'>Artista</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </main>

    </div>
  );
}