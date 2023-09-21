import React from 'react'
import Cabecalho from './Cabecalho';

const Aplicacaomobile = () => {
  const currentuserId = localStorage.getItem('currentuserId');
  console.log('user id do login: ',currentuserId); // Exemplo de uso do ID do usuário
  
  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }
  return (
    
    <>
     <Cabecalho></Cabecalho>
    <div> Link para o download da aplicação Mobile em desenvolvimento</div>

    </>
  )
}

export default Aplicacaomobile;