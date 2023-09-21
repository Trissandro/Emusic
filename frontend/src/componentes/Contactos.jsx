import React from 'react';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import './contactos.css';
import img1 from './imagens/Emanuel.jpg';
import img2 from './imagens/Malcom.jpg';


const Contactos = () => {
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
    <div className='contactos'>
      <div className='Contacto1'>
      <img
                src={img1}
                alt={"imagem de Emanuel"}
              />
      <p>Nome: Emanuel Zangui</p>
      <p>Telefone: +244 930137629</p>
      <p>Cargo: Desenvolvedor </p>
      </div>
     

    </div>
    <Rodape></Rodape>
    </>
  )
}

export default Contactos;