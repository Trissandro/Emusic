import React from 'react'
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

const Servicos = () => {
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
    <div className='servicos'>Serviços
    <div className="servicoslista">Streaming de músicas</div>
    <div className="servicoslista">Streaming de vídeos</div>
    <div className="servicoslista">Recomendações de conteúdo</div>
    <div className="servicoslista">Letras de músicas</div>
    <div className="servicoslista">Download de músicas e vídeos</div>
    <div className="servicoslista">Compartilhamento de conteúdo</div>
    </div>
    <Rodape></Rodape>
    </>
  )
}
export default Servicos;