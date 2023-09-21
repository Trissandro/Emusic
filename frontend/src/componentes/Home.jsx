import React, { useEffect, useState } from 'react'
import './Home.css';
import axios from 'axios';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import { Link } from 'react-router-dom';
import { FaHome, FaMicrophone, FaMusic, FaVideo } from 'react-icons/fa';

const Home = () => {
  const currentuserId = localStorage.getItem('currentuserId');
  console.log('user id do login: ',currentuserId);
  const [videos,setVideos]=useState([]);
  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }

  useEffect(() => {
    obterVideos();
  }, []);

  const obterVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3333/midias');
      setVideos(response.data);
    } catch (error) {
      console.error('Erro ao obter vídeos:', error);
    }
  };

    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredImages = videos.filter((video) => {
      const { titulo, autor,grupo,tipo } = video;
      const query = searchQuery.toLowerCase();
      return titulo.toLowerCase().includes(query) || autor.toLowerCase().includes(query)|| grupo.toLowerCase().includes(query)|| tipo.toLowerCase().includes(query);
    });
    const videos1 = filteredImages.filter((video) => video.tipo === 'video');
    const musicas1 = filteredImages.filter((video) => video.tipo !== 'video');
  
    const [hoveredId, setHoveredId] = useState(null);
    const combinedElements = [...videos1, ...musicas1];

  return (
    <>
     <Cabecalho></Cabecalho>
    
    <div className='pesquisar'>
    <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Pesquisar por título ou autor"
      />
    </div>
    <div className="container1">
      <div className="lado-esquerdo">
      <div>
        <Link to={'/Home'}><FaHome>
        </FaHome>     Home</Link>
        </div>
        <div className='radiobotao'>
          <Link to={'/Radio'}><FaMicrophone></FaMicrophone>     Rádio</Link>
        </div>
        <div>
        <Link to={'/Musica'}><FaMusic>
        </FaMusic>     Músicas</Link>
        </div>
        <div>
        <Link to={'/Video'}><FaVideo>
        </FaVideo>     Vídeo</Link>
        </div>

      </div>

      <div className="barra" />

      <div className="lado-direito">
      <div className='corpo'>
      <p className='Todos'>Mídeas</p>
      <div className="Lista-videos">
      {combinedElements.map((video) => (
        <div className="videos" key={video.id}>
          {video.tipo === 'video' ? (
            <Link
              to={`/videoplayer/${video.id}`}
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img src={video.capa} alt={video.titulo} />
              <div className={`video-detalhes ${hoveredId === video.id ? 'hovered' : ''}`}>
                <h3 className="videoautor">{video.autor}</h3>
                <h2 className="videotitulo">{video.titulo}</h2>
                <h2 className="videotitulo">{video.tipo}</h2>

                {hoveredId === video.id && <span className="play-icon" />}
              </div>
            </Link>
          ) : (
            <Link
              to={`/Reproduziraudio/${video.id}`}
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img src={video.capa} alt={video.titulo} />
              <div className={`video-detalhes ${hoveredId === video.id ? 'hovered' : ''}`}>
                <h3 className="videoautor">{video.autor}</h3>
                <h2 className="videotitulo">{video.titulo}</h2>
                <h2 className="videotitulo">{video.tipo}</h2>
                {hoveredId === video.id && <span className="play-icon" />}
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
    
     </div>
      </div>
    </div>
   
     <Rodape></Rodape>
    </>
  )
}

export default Home;