import React from 'react';
import VideoPlayer from './videoplayer';

const Reproduzirvideo = () => {
  const currentuserId = localStorage.getItem('currentuserId');
  console.log('user id do login: ',currentuserId); // Exemplo de uso do ID do usuário
  
  if (!localStorage.getItem('currentuserId')) {
    localStorage.removeItem('currentuserId');
    alert('Logout já foi feito e será reencaminhado ao ecrã de Login');
    window.location.href = `/`;
  }

  return (
    <div>
      <h1>Página de Reprodução de Vídeo</h1>
      <VideoPlayer />
    </div>
  );
};

export default Reproduzirvideo;
