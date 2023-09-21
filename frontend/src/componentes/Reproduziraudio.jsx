import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHome, FaMicrophone, FaMusic, FaVideo } from 'react-icons/fa';
import './Reproduziraudio.css';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

const Reproduziraudio = () => {
  const currentuserId = localStorage.getItem('currentuserId');
  console.log('user id do login: ', currentuserId);

  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }

  const { idaudio } = useParams();
  const [audioo, setAudio] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [comments, setComments] = useState([]);
  const [coment, setComent] = useState('');
  const [videos, setVideos] = useState([]);

  const handleReproduzir = (index) => {
    console.log('index' + index);
    if (index >= 0 && index < videos.length) {
      sessionStorage.setItem('currentvideoindex', index);
      const videoId = videos[index].id;
      window.location.href = `/Reproduziraudio/${videoId}`;
    }
  };

  const handleReproduzirProximo = () => {
    const ob = sessionStorage.getItem('currentvideoindex');
    const nextVideoIndex = (ob + 1) % videos.length;
    handleReproduzir(nextVideoIndex);
  };

  const handleReproduzirAnterior = () => {
    const ob = sessionStorage.getItem('currentvideoindex');
    const previousVideoIndex = (ob - 1 + videos.length) % videos.length;
    handleReproduzir(previousVideoIndex);
  };

  console.log('o id do audio', idaudio);
  useEffect(() => {
    const getAudio = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/videos/${idaudio}`);
        setAudio(response.data.path);
        setImagem(response.data.capa);
        setTitulo(response.data.titulo);
        setAutor(response.data.autor);
        const autormusicaid = response.data.userId;
        sessionStorage.setItem('autormusicaid', autormusicaid);
        console.log('Dono da música: ', autormusicaid);
        console.log('response: ', response);
      } catch (error) {
        console.error('Erro ao obter o caminho do vídeo:', error);
      }
    };

    getAudio();
  }, [idaudio]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`http://localhost:3333/comments/${idaudio}`);
      const data = await response.json();
      setComments(data);
    };
    fetchComments(idaudio);
  }, [idaudio]);

  useEffect(() => {
    obterVideos();
  }, []);

  const obterVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3333/midias');
      // Filtrar os audios, mostrando apenas os com tipo "musica"
      const audiosFiltrados = response.data.filter((video) => video.tipo !== 'video');
      setVideos(audiosFiltrados);
    } catch (error) {
      console.error('Erro ao obter vídeos:', error);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/coments', {
        coment,
        userId: currentuserId,
        midiaId: idaudio,
      });

      console.log(response.data);
      handleReload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <Cabecalho />
      <div className="container1">
        <div className="lado-esquerdo" color='whitesmoke'>
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
        </div>
        <div className="barra" />
        <div id="lado-meio">
          <div className="card">
            {/* Lado do meio */}
            <div id="display">
              <div id="header">
                <Link to={'/Cantor'}>
                  <h1 id="title">{autor}</h1>
                </Link>
                <p>
                  <span id="song_title">{titulo}</span>
                </p>
              </div>
              <div id="image">
                {<img src={imagem} alt={titulo} id="art" />}
              </div>
              <div className="botaorecuaravancar">
                <button className="botaorecuarmu" onClick={handleReproduzirAnterior}>
                  <FaArrowLeft /> Anterior
                </button>
                {<audio id="audio" src={audioo} controls />}
                <button className="botaoavancar" onClick={handleReproduzirProximo}>
                  <FaArrowRight /> Próximo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="barra" />

        <div id="lado-direito">
          <div className="videos">
            {/* Lado direito */}
            <ul>
              {videos.map((audio) => (
                <li key={audio.id}>
                  <Link to={`/Reproduziraudio/${audio.id}`} onClick={() => handleReproduzir(audio.id)}>
                    <img src={audio.capa} alt={audio.titulo} />
                    {audio.autor}
                    {audio.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
      <div id="lado-de-baixo">
          {/* Lado de baixo */}
          <div>
            <h1>Comentar</h1>
            <form onSubmit={submitComment}>
              <div>
                <label htmlFor="coment">Escreva o seu comentário:</label>
                <input
                  type="text"
                  id="coment"
                  value={coment}
                  onChange={(e) => setComent(e.target.value)}
                />
              </div>
              <button type="submit">Comentar</button>
            </form>
            <h2 className="comm">Comentários</h2>
            <div className="comenta">
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>Usuário:</strong> {comment.userId}
                    <br />
                    <strong>Comentário:</strong> {comment.coment}
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      <Rodape />
    </>
  );
};

export default Reproduziraudio;
