import React, {useState, useEffect } from 'react'
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import './actualizarusuario.css';

const Actualizarusuario = () => {
  const currentuserId = localStorage.getItem('currentuserId');
  console.log('id do login: ',currentuserId); // Exemplo de uso do ID do usuário
  const [user, setUser] = useState(null);
  console.log('usuario:', user)
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [passe, setPasse] = useState('');

  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }

  useEffect(() => {
    // Função para buscar os dados do usuário
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3333/actualizar/${currentuserId}`); // Substitua ":id" pelo ID do usuário desejado
        const data = await response.json();
        console.log("data: ", data)
        setUser(data);
        setName(data.name);
        setPasse(data.passe);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUser();
  }, [currentuserId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3333/user/${currentuserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, passe }),
      });

      if (response.ok) {
        setEditMode(false);
        // Exibir mensagem de sucesso ou realizar outra ação necessária
      } else {
        console.error('Erro ao atualizar os dados do usuário');
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
    }
  };

  if (editMode) {
    return (
      <>
      <Cabecalho></Cabecalho>

      <div className='topoformeditarusuario'>
      
         <div className='formeditarusuario'>
          <h1>Dados do Usuário</h1>
        <form>
          <div>
            <label>Nome:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" value={passe} onChange={(e) => setPasse(e.target.value)} />
          </div>
          <button className='botaoformeditarusuario' onClick={handleSave}>Salvar</button>
        </form>
      </div>      
      </div>

     
      <Rodape></Rodape>
      </>
    );
  }

  return (
    <>
    <Cabecalho> </Cabecalho>
    <div className='pageformeditarusuario'>
         <div className='formeditarusuario'><div className='topoformeditarusuario'>
      <h1>Dados do Usuário</h1>
      </div>
      {user ? (
        <>
  
  <div class="form-group">
    <label htmlFor="name">Nome:</label>
    <h2>Nome: {user.name}</h2>
  </div>
  <div class="form-group">
    <label htmlFor="email">Email:</label>
    <h2>Email: {user.email}</h2>  </div>
  <div class="form-group">
    <label htmlFor="message">Senha:</label>
    <h2>Senha: {user.passe}</h2>
  </div>
  <button onClick={handleEdit}>Editar</button>

        </>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
    </div>
    <Rodape></Rodape>
    </>
    
  );
};

export default Actualizarusuario;