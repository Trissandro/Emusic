import React, { useState } from 'react';
import Cadastrar from './Cadastrar';
import { Link } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const handleLogin = async (e) => {
    setError('');
    e.preventDefault();

    if (!email.endsWith('@isptec.co.ao')) {
      setError('O email deve conter "@isptec.co.ao"');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/user/${email}`);
  
      if (response.ok) {
        const user = await response.json();
        
        if (password === user.passe) {
          const currentuserId = user.id;
          console.log('user id', currentuserId);
          localStorage.setItem('currentuserId', currentuserId);
          window.location.href = '/Home';
        } else { 
          setError('Email or password is incorrect');
        }
      } else {
        setError('Email or password is incorrect');
      }
    } catch (error) {
      setError('An error occurred while processing your request');
    }
  };

  return (
    <>
    <div className="page">
      <h2>Faça o Login Aqui</h2>
      {error && <p>{error}</p>}
      <form className="formLogin">
        <div className='bluee'>
          <label htmlFor="email">Email:</label>
          <input  
          autoFocus={true} 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='bluee'>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="button" onClick={handleLogin}>        
          Entrar
        </button>
        <Link to="/Cadastrar" element={<Cadastrar/>}>Cadastar-me</Link>
        
      </form>
    </div>
    </>
    
  )
}

export default Login;