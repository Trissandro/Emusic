import React, { useEffect, useState } from 'react'
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import './perfil.css';
import axios from 'axios';
import { FaRegEdit, FaTrash} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { uploadFile } from '../firebase/storage';
import { CircularProgress } from '@mui/material';


const Perfil = () => {
  const [videos,setVideos]=useState([]);

  const currentuserId = localStorage.getItem('currentuserId');
  console.log('user id do login: ',currentuserId);
  
  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState([]);
  const [nameuser, setNameUser] = useState([]);
  const [emailuser, setEmailUser] = useState([]);
  const [seguindouser, setSeguindoUser] = useState([]);
  const [seguidoresuser, setSeguidoresUser] = useState([]);
  const [adminuser, setAdminUser]=useState([]);





  const obterVideos = async (userId, admin) => {
    try {
      const response = await axios.get(`http://localhost:3333/midia/${userId}?admin=${admin}`);
      setVideos(response.data);
    } catch (error) {
      console.error('Erro ao obter vídeos:', error);
    }
  };
  useEffect(() => {
    obterVideos(currentuserId, adminuser);
  }, [currentuserId,adminuser]);
  

  const handleDelete = async (idv)=>{
    try {
      await axios.delete(`http://localhost:3333/midias/${idv}`)
      
      window.location.reload()
    } catch (err) {
      console.log(err)
    }

  };
 
      const [formValues, setFormValues] = useState({
        titulo: '',
        autor: '',
        compositor: '',
        editora: '',
        grupo: '',
        historia: '',
        periodo: '',
        capaPath: '',
        midiaPath: '',
        tipo: '',
        userId: currentuserId
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
      const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormValues({ ...formValues, [`${name}File`]: files[0] });
        console.log(formValues)
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
      
        const { titulo, autor, compositor, editora, grupo, historia, periodo, capaFile, midiaFile, tipo, userId } = formValues;
      
        // Verificar se a capa é uma imagem
        const capaExtension = capaFile.name.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif','heic'];
        if ((tipo==='video')&&(!imageExtensions.includes(capaExtension))) {
          console.log('A capa deve ser uma imagem válida.');
          return;
        }
      
        // Verificar se o path é um vídeo
        const midiaExtension = midiaFile.name.split('.').pop().toLowerCase();
        const videoExtensions = ['mp4', 'avi', 'mov', 'wmv','mkv'];
        if ((tipo==='video')&&(!videoExtensions.includes(midiaExtension))) {
          console.log('Escolha um video válido');
          return;
        }
         // Verificar se o path é um audio
        const audioExtension = ['aud', 'mp3', 'm4a'];
        if ((tipo==='musica')&&(!audioExtension.includes(midiaExtension))) {
          console.log('Escolha um audio válido');
          return;
        }
        try {
          setUploading(true);
          const capaPath = await uploadFile("capa"+userId + titulo+'.'+capaExtension, capaFile);
          const midiaPath = await uploadFile("midia"+userId + titulo+'.'+midiaExtension, midiaFile);

          const response = await axios.post('http://localhost:3333/gravar/midias', {
            titulo,
            autor,
            compositor,
            editora,
            grupo,
            historia,
            periodo,
            capa: capaPath,
            path: midiaPath,
            tipo,
            userId
            
          });
    
          console.log(response.data); // Exibe a resposta do servidor
          setUploading(false);
          // Limpar o formulário após o envio bem-sucedido
          setFormValues({
            titulo: '',
            autor: '',
            compositor: '',
            editora: '',
            grupo: '',
            historia: '',
            periodo: '',
            capaPath: '',
            midiaPath: '',
            tipo: '',
          });
        } catch (error) {
          console.error(error);
          setUploading(false);
        }
      };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/dadouser/${currentuserId}`);
        setUsers(response.data);
        setNameUser(response.data.name)
        setEmailUser(response.data.email)
        setSeguidoresUser(response.data.seguidores)
        setSeguindoUser(response.data.seguindo)
        setAdminUser(response.data.admin)

      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, [currentuserId]);
  console.log('users: ', users)

  const handleSair = () => {
    if (localStorage.getItem('currentuserId')) {
      localStorage.removeItem('currentuserId');
      alert('Logout bem sucedido');
      window.location.href = `/`;
    }
  }
  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }
  return (
    <>
      <Cabecalho></Cabecalho>
      <div className="container">
        <div className="left-content">
          <div className="top-content">
            <div className="formadicionarmidea">
              <h2 className="Adicionarmedia1">Adicionar Mídia</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                  Título:
                  <input
                    type="text"
                    name="titulo"
                    value={formValues.titulo}
                    onChange={handleInputChange}
                  />
                </label>
                </div>
                <div>
                  <label>
                  Autor:
                  <input
                    type="text"
                    name="autor"
                    value={formValues.autor}
                    onChange={handleInputChange}
                  />
                </label>
                  </div>
                  <div>
                   <label>
                  Compositor:
                  <input
                    type="text"
                    name="compositor"
                    value={formValues.compositor}
                    onChange={handleInputChange}
                  />
                </label>
                  </div>
                  <div>
                   <label>
                  Editora:
                  <input
                    type="text"
                    name="editora"
                    value={formValues.editora}
                    onChange={handleInputChange}
                  />
                </label>
                  </div>
                  <div>
                   <label>
                  Grupo:
                  <input
                    type="text"
                    name="grupo"
                    value={formValues.grupo}
                    onChange={handleInputChange}
                  />
                </label>
                  </div>
                 
                  <div>
                   <label>
                  Período:
                  <input
                    type="text"
                    name="periodo"
                    value={formValues.periodo}
                    onChange={handleInputChange}
                  />
                </label>
                  </div>
                  <div>
                   <label>
                  Capa:
                  <input type="file" name="capa" onChange={handleFileChange} />
                </label>
                  </div>
                  <div>
                   <label>
                  Mídia:
                  <input type="file" name="midia" onChange={handleFileChange} />
                </label>
                  </div>
                  <div>
                   <label>
                  Tipo:
                  <select
                    name="tipo"
                    value={formValues.tipo}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="video">Vídeo</option>
                    <option value="musica">Música</option>
                  </select>
                </label>
                  </div>
                  <div>
                  <label>
                  História:
                  <textarea
                    name="historia"
                    value={formValues.historia}
                    onChange={handleInputChange}
                  />
                </label>
                  </div>
                  <div>
                  {uploading && <CircularProgress />} {/* Ícone de carregamento */}
                  {!uploading && (
                    <button className="botaoenviarform" type="submit">
                      Adicionar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
  
          <div className="divider-gray1"></div>
  
          <div className="bottom-content2">
          <h2 className='opt1'>Minhas Músicas e videos</h2>
          <div className='opt'>
            <h3 className='opt2'> Imagem</h3>
            <h3> Video/Música</h3>
            <h3> Titulo</h3>
            <h3> Opções</h3>
          </div>
            {videos.length === 0 ? (
              <p>Não carregou nenhuma mídia</p>
            ) : (
              videos.map((video) => (
                <div className="videosperfil" key={video.id}>
                  {video.tipo === "video" ? (
                    <div>
                      <img src={video.capa} alt={video.titulo} />
                      <Link to={`/videoplayer/${video.id}`}>
                        <video>
                          <source src={video.path} type="video/mp4" />
                        </video>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <img src={video.capa} alt={video.titulo} />
                      <Link to={`/Reproduziraudio/${video.id}`}>
                        <audio controls pause>
                          <source src={video.path} type="audio/mp3" />
                        </audio>
                      </Link>
                    </div>
                  )}
  
                  <h3>{video.titulo}</h3>
                  <p>{video.historia}</p>
                  <div>
                      <Link  to={`/Actualizarvideo/${video.id}`}> <FaRegEdit className="editar"/></Link>
                    <FaTrash
                      className="eliminar"
                      onClick={() => handleDelete(video.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
  
        <div className="divider-gray"></div>
  
        <div className="right-content">
          <div className="cont">
            <div className="Atualizar dados">
              <p>Nome: {nameuser}</p>
              <p>Email: {emailuser}</p>
            </div>
            <Link to={`/Actualizarusuario/`}>Editar</Link>
            <Link onClick={() => handleSair()}>Sair</Link>

          </div>
  
          <div className="divider-gray1"></div>
          <div className="bottom-content">
            <div className="Atualizar dados">
              <h2>Amigos & Seguidores</h2>
              <p>Seguidores: {seguidoresuser}</p>
              <p>Seguindo: {seguindouser}</p>
            </div>
          </div>
        </div>
      </div>
      <Rodape></Rodape>
    </>
  );
                  }

export default Perfil;