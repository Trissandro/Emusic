import React from 'react'
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import './Termos.css';

const Sobre = () => {
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
     <div className='termoscorpo'>
     <div className='listatermos'>1. Licença de Uso: Concordar com os termos de uso estabelecidos pela aplicação para acessar e utilizar seus serviços.</div>
      <div className='listatermos'>2. Direitos Autorais: Respeitar os direitos dos criadores de conteúdo e não utilizar material protegido por direitos autorais sem permissão.</div>
      <div className='listatermos'>3. Conteúdo Legal: Utilizar apenas conteúdo legalmente adquirido, licenciado ou fornecido pela aplicação.</div>
      <div className='listatermos'>4. Restrições de Uso: Seguir as regras impostas pela aplicação, como limites de downloads, compartilhamento e acesso em diferentes dispositivos.</div>
      <div className='listatermos'>5. Uso Pessoal: Utilizar a aplicação e o conteúdo apenas para fins pessoais e não comerciais.</div>
      <div className='listatermos'>6. Contas e Senhas: Manter as informações de conta seguras e não compartilhar as credenciais de login com terceiros.</div>
      <div className='listatermos'>7. Uso Responsável: Utilizar a aplicação de maneira responsável, respeitando outros usuários e evitando conteúdo ofensivo.</div>
      <div className='listatermos'>8. Privacidade: Respeitar a política de privacidade da aplicação e estar ciente das informações coletadas e compartilhadas.</div>
      <div className='listatermos'>9. Atualizações e Notificações: Manter a aplicação atualizada e responder a notificações importantes enviadas pela aplicação.</div>
      <div className='listatermos'>10. Cancelamento de Serviços: Saber como cancelar ou encerrar a assinatura ou uso da aplicação, se desejar interromper o serviço.</div>
      <div className='listatermos'>11. Streaming de Música: Reproduzir músicas em tempo real, diretamente da aplicação, sem a necessidade de download.</div>
      <div className='listatermos'>12. Streaming de Vídeos: Assistir a vídeos em tempo real, sem a necessidade de download, por meio da aplicação.</div>
      <div className='listatermos'>13. Assinatura de Serviço: Concordar com os termos de assinatura e pagamento para acessar o conteúdo da aplicação.</div>
      <div className='listatermos'>14. Compartilhamento de Contas: Possibilitar o compartilhamento de uma única conta entre diferentes usuários, dependendo das regras estabelecidas pela aplicação.</div>
      <div className='listatermos'>15. Limite de Dispositivos: Restringir o número de dispositivos em que a conta pode ser usada simultaneamente.</div>
     </div>
    <Rodape></Rodape>
    </>
  )
}

export default Sobre