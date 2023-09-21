import React, {useState, useEffect } from 'react'
import Cabecalho from './Cabecalho';
import './perfil.css';
import './Actualizarvideo.css';
import { useLocation } from 'react-router-dom';
import Rodape from './Rodape';
import axios from 'axios';
import { uploadFile } from '../firebase/storage';



const Actualizarvideo = () => {
  const currentuserId = localStorage.getItem('currentuserId');
  console.log('user id do login: ', currentuserId);

  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }

  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  const videoID = location.pathname.split("/")[2];
  console.log("id do video: ",videoID)
  const [midia, setMidia] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [path, setPath] = useState(null);
  const [autor, setAutor] = useState('');
  const [compositor, setCompositor] = useState('');
  const [editora, setEditora] = useState('');
  const [grupo, setGrupo] = useState('');
  const [historia, setHistoria] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [capa, setCapa] = useState(null);
  const [formValues, setFormValues] = useState({
    titulo: '',
    tipo: '',
    autor: '',
    compositor: '',
    editora: '',
    grupo: '',
    historia: '',
    periodo: '',
    capaFile: null,
    midiaFile: null
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormValues({ ...formValues, [`${name}File`]: files[0] });
  };

  useEffect(() => {
    const fetchMidia = async () => {
      try {
        const response = await fetch(`http://localhost:3333/midias/${videoID}`);
        const data = await response.json();
        setMidia(data);
        setTitulo(data.titulo);
        setTipo(data.tipo);
        setPath(data.path);
        setAutor(data.autor);
        setCompositor(data.compositor);
        setEditora(data.editora);
        setGrupo(data.grupo);
        setHistoria(data.historia);
        setPeriodo(data.periodo);
        setCapa(data.capa);
      } catch (error) {
        console.error('Erro ao buscar a mídia:', error);
      }
    };

    fetchMidia();
  }, [videoID]);

  const handleEdit = () => {
    setEditMode(true);
  };

  

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log('1')
      const { titulo, autor, compositor, editora, grupo, historia, periodo, capaFile, midiaFile, tipo} = formValues;

      const capaPath = await uploadFile("capa" + currentuserId + titulo, capaFile);
      const midiaPath = await uploadFile("midia" + currentuserId + titulo, midiaFile);
      console.log('2')

      const response = await axios.put(`http://localhost:3333/actualizar/midias/${videoID}`, {
        titulo,
        autor,
        compositor,
        editora,
        grupo,
        historia,
        periodo,
        capa: capaPath,
        path: midiaPath,
        tipo
      });

      if (response.ok) {
        console.log('Mídia atualizada com sucesso');
        setEditMode(false);
        window.location.href="/Home";
      } else {
        console.error('Erro ao atualizar a mídia');
      }
    } catch (error) {
      console.error('Erro ao atualizar a mídia:', error);
    }
  };

  if (!midia) {
    return <p>Carregando mídia...</p>;
  }

  if (editMode) {
    return (
      <>
      <div className='formactualizarvideo'>
        <h2>Editar Mídia</h2>
        <form>
        <label>
          Título:
          <input type="text" name="titulo" value={formValues.titulo} onChange={handleInputChange} required/>
        </label>
        <label>
          Autor:
          <input type="text" name="autor" value={formValues.autor} onChange={handleInputChange} required/>
        </label>
        <label>
          Compositor:
          <input type="text" name="compositor" value={formValues.compositor} onChange={handleInputChange} required/>
        </label>
        <label>
          Editora:
          <input type="text" name="editora" value={formValues.editora} onChange={handleInputChange} required/>
        </label>
        <label>
          Grupo:
          <input type="text" name="grupo" value={formValues.grupo} onChange={handleInputChange} required/>
        </label>
        <label>
          História:
          <textarea name="historia" value={formValues.historia } onChange={handleInputChange} required/>
        </label>
        <label>
          Período:
          <input type="text" name="periodo" value={formValues.periodo } onChange={handleInputChange} required/>
        </label>
        <label>
          Capa:
          <input type="file" name="capa" onChange={handleFileChange} required/>
        </label>
        <label>
          Mídia:
          <input type="file" name="midia" onChange={handleFileChange} required/>
        </label>
        <label>
          Tipo:
          <select name="tipo" value={formValues.tipo } onChange={handleInputChange}>
            <option value="">Selecione o tipo</option>
            <option value="video">Vídeo</option>
            <option value="musica">Música</option>
          </select>
          </label>
          <button onClick={handleSave}>Salvar</button>
        </form>
      </div>
      <Rodape></Rodape>
      </>
    );
  }

  return (
    <>
    <Cabecalho></Cabecalho>
    <div className='formactualizarvideo'>
      <h2>Dados da Mídia</h2>
      <p>Título: {titulo}</p>
      <p>Tipo: {tipo}</p>
      <p>Autor: {autor}</p>
      <p>Compositor: {compositor}</p>
      <p>Editora: {editora}</p>
      <p>Grupo: {grupo}</p>
      <p>História: {historia}</p>
      <p>Período: {periodo}</p>
      {<img src={capa} alt={titulo}/>}
      {<video> <source src={path} type="video/mp4" /> </video>}
      <button onClick={handleEdit}>Editar</button>
    </div>
      <Rodape></Rodape>
    </>
  )
}

export default Actualizarvideo;
