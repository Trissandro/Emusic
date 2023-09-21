import React, {useState } from 'react';
import axios from 'axios';
import './Cadastrar.css';
import { Link } from 'react-router-dom';

const Cadastrar = () => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passe, setPasse] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@isptec.co.ao')) {
      setError('O email deve conter "@isptec.co.ao"');

      return;
    }
    
    const regex = /^\d{8}@isptec\.co\.ao$/;
    if (!regex.test(email)) {
      setError('Formato do email está incorrecto');
      return;
    }

    try {
      const newUser = {
        email,
        name,
        passe,
        admin:'false',
        seguidores: 0,
        seguindo: 0
      };
      const response = await axios.post('http://localhost:3333/user', newUser);
      console.log(response.data); // User data returned from the backend

      // Reset form fields
      setName('');
      setEmail('');
      setPasse('');
      window.location.href="/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <div className='cadastrarcorpo'>
        <form onSubmit={handleSubmit}>
          <h2>Cadastrar Usuário</h2>
          <label>
          {error}
          </label>
      <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}required />
    </div>
    <div className="form-group">
    <label htmlFor="email">Email:</label>  
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
    </div>
    <div className="form-group">
    <label htmlFor="password">palavra-passe:</label>
        <input type="password" value={passe} onChange={(e) => setPasse(e.target.value)} required/>
    </div >
      <button className="btnadicionar" type="submit">Adicionar</button>
      <Link className="cancelaradicionar" to={'/'}>Cancelar</Link>
    </form>
        </div>
    </>
    
   
  );
};


export default Cadastrar;