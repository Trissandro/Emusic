import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import './videoplayer.css';
import { Link } from 'react-router-dom';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';

const VideoPlayer = () => {
  const currentuserId = localStorage.getItem('currentuserId');
  console.log('user id do login: ',currentuserId); // Exemplo de uso do ID do usuário
  const {idvideo: id}  = useParams();
  const [video, setVideo] = useState(null);
  const [titulo,setTitulo]=useState('');
  const [autor, setAutor]=useState('');
  const [comments, setComments] = useState([]);
  const [coment, setComent] = useState('');
  const [videos, setVideos] = useState([]);

  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }

    console.log(id)
    console.log('video: '+ video)

    useEffect(() => {
        const getVideoUrl = async () => {
          try {
            const response = await axios.get(`http://localhost:3333/videos/${id}`);
            setVideo(response.data.path);
            setTitulo(response.data.titulo)
            setAutor(response.data.autor);
            const autormusicaid = response.data.userId;
            sessionStorage.setItem('autormusicaid', autormusicaid);
            console.log("Dono da música: ", autormusicaid)
            console.log('response: ', response);
            console.log(`aqui `+ setVideo);
          } catch (error) {
            console.error('Erro ao obter o caminho do vídeo:', error);
          }
        };
      
        getVideoUrl();
      }, [id]);


      useEffect(() => {
        const fetchComments = async () => {
          const response = await fetch(`http://localhost:3333/comments/${id}`);
          const data = await response.json();
          setComments(data);
        };
        fetchComments(id);
      }, [id]);
      
      useEffect(() => {
        obterVideos();
      }, []);
    
      const obterVideos = async () => {
        try {
          const response = await axios.get('http://localhost:3333/midias');
          // Filtrar os vídeos, mostrando apenas os videos com tipo "video"
          const videosFiltrados = response.data.filter((video) => video.tipo === 'video');
          setVideos(videosFiltrados);
          console('videos: '+setVideos)
        } catch (error) {
          console.log('Erro ao obter vídeos:', error);
        }
      };

      const handleReproduzir = (index) => {
        console.log('index'+index)
        if (index >= 0 && index < videos.length) {
          sessionStorage.setItem('currentvideoindex', index);
          const videoId = videos[index].id;
          window.location.href = `/Videoplayer/${videoId}`;
        }
      };

      const handleReproduzirProximo = () => {
        const ob = sessionStorage.getItem('currentvideoindex');
        const nextVideoIndex = (ob + 1) % videos.length;
        handleReproduzir(nextVideoIndex);
      };
      
      const handleReproduzirAnterior = () => {
        const ob = sessionStorage.getItem('currentvideoindex');
        const previousVideoIndex = (ob -1) % videos.length;
        handleReproduzir(previousVideoIndex);
      };
      
      const submitComment = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3333/coments', {
            coment,
            userId: currentuserId,
            midiaId: id,
          });
          console.log(response.data); // Exibe a resposta do servidor
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
    <Cabecalho></Cabecalho>
    <div className='videoplayerform'>
      {video ? (
        <>
        <video controls>
          <source src={video}  type="video/mp4" />
          Desculpe, seu navegador não suporta a reprodução de vídeos.
        </video>
        <div className='botaorecuaravancar'>
          <button className='botaorecuar' onClick={handleReproduzirAnterior}><FaArrowLeft> </FaArrowLeft> Anterior</button>
          <button className='botaoavancar' onClick={handleReproduzirProximo}><FaArrowRight></FaArrowRight> Próximo</button>
        </div>
        <div>
      <h1>Lista de Vídeos</h1>
      <ul>
        {videos.map((video, index) => (
          <li key={video.id}>
            <Link to={`/Videoplayer/${video.id}`} onClick={() => handleReproduzir(index)}>
            <img src={video.capa} alt={video.titulo} />
            {video.autor}
              {video.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
         <div id="dadovideo">
        <h2 className='dadoh2'>Informações do vídeo</h2>
        <Link className='dadoh1' to={'/Cantor'}><h3 className='dadoh1'> Autor: {autor}</h3></Link> 
        <h3 className='dadoh3'> Titulo: {titulo}</h3>
        </div>
       
        </>
      ) : (
        <p>Carregando vídeo...</p>
      )}
    </div>
   
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
            <h2 className='comm'>Comentários</h2>
            <div className='comenta'>
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>Usuário:</strong> {comment.userId}<br />
                    <strong>Comentário:</strong> {comment.coment}<br />

                  </li>
                ))}
              </ul>
            </div>
          </div>
    <Rodape></Rodape>
    </>
    
  );
};

export default VideoPlayer;


