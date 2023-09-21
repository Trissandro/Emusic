import React from 'react'
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import './Termos.css';

const Termos = () => {
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
      <div className='listatermos'>16. Qualidade de Áudio: Ter opções de qualidade de áudio para escolher, como alta definição ou qualidade padrão.</div>
      <div className='listatermos'>17. Qualidade de Vídeo: Ter opções de qualidade de vídeo para escolher, como alta definição ou qualidade padrão.</div>
      <div className='listatermos'>18. Restrições Geográficas: Respeitar as restrições geográficas impostas pela aplicação, que podem limitar o acesso a determinados conteúdos em certas regiões.</div>
      <div className='listatermos'>19. Publicidade: Exibição de anúncios durante o uso da aplicação para suportar o serviço.</div >
      <div className='listatermos'>20. Recomendações Personalizadas: Receber recomendações de músicas, vídeos ou conteúdo com base no histórico de uso e preferências do usuário.</div>
      <div className='listatermos'>21. Descoberta de Novos Artistas: Receber sugestões e descobrir novos artistas com base no gosto musical do usuário.</div>
      <div className='listatermos'>22. Playlists Personalizadas: Criar listas de reprodução personalizadas com músicas favoritas ou selecionadas pelo usuário.</div>
      <div className='listatermos'>23. Download de Conteúdo: Baixar músicas, vídeos ou conteúdo para acesso offline, dependendo das permissões e restrições da aplicação.</div>
      <div className='listatermos'>24. Reprodução Offline: Permitir a reprodução de músicas, vídeos ou conteúdo baixado, mesmo quando o dispositivo está desconectado da internet.</div>
      <div className='listatermos'>25. Compartilhamento de Conteúdo: Compartilhar músicas, vídeos ou conteúdo com outros usuários por meio de links ou recursos de compartilhamento integrados na aplicação.</div>
      <div className='listatermos'>26. Notificações de Lançamentos: Receber notificações sobre novos lançamentos de artistas ou atualizações de conteúdo.</div>
      <div className='listatermos'>27. Modo de Reprodução Aleatória: Reproduzir músicas ou vídeos em ordem aleatória, sem uma sequência específica.</div>
      <div className='listatermos'>28. Letras de Músicas: Exibir letras de músicas durante a reprodução para acompanhar e cantar junto.</div>
      <div className='listatermos'>29. Reconhecimento de Música: Identificar músicas desconhecidas por meio do uso de tecnologias de reconhecimento de áudio.</div>
      <div className='listatermos'>30. Rádios e Estações de Curadoria: Acessar rádios ou estações de música criadas por curadores ou com base em gêneros ou artistas específicos.</div>
      <div className='listatermos'>31. Comentários e Avaliações: Comentar e avaliar músicas, vídeos ou conteúdo na aplicação, compartilhando opiniões e feedback.</div>
      <div className='listatermos'>32. Integração com Redes Sociais: Compartilhar conteúdo da aplicação em redes sociais e conectar a conta da aplicação a perfis de redes sociais.</div>
      <div className='listatermos'>33. Comunidades de Fãs: Participar de comunidades, fóruns ou grupos dedicados a artistas, gêneros ou conteúdos específicos.</div>
      <div className='listatermos'>34. Podcasts e Shows de Rádio: Acesso a programas de rádio e podcasts disponíveis na aplicação.</div>
      <div className='listatermos'>35. Acesso a Concertos e Eventos: Receber informações sobre shows ao vivo, eventos e ingressos por meio da aplicação.</div>
      <div className='listatermos'>36. Recomendações de Filmes e Séries: Receber sugestões de filmes e séries com base no histórico de visualização e preferências do usuário.</div >
      <div className='listatermos'>37. Categorias de Gêneros Musicais: Navegar e explorar músicas com base em categorias de gêneros musicais, como pop, rock, eletrônica, etc.</div >
      <div className='listatermos'>38. Categorias de Gêneros de Filmes e Séries: Navegar e explorar filmes e séries com base em categorias de gêneros, como ação, comédia, drama, etc.</div>
      <div className='listatermos'>39. Compartilhamento em Redes Sociais: Compartilhar filmes, séries ou conteúdo da aplicação em redes sociais por meio de recursos integrados.</div>
      <div className='listatermos'>40. Compatibilidade com Dispositivos: Suporte e acesso à aplicação em diferentes dispositivos, como smartphones, tablets, computadores, etc.</div>
      <div className='listatermos'>41. Compatibilidade com Sistemas Operacionais: Suporte e acesso à aplicação em diferentes sistemas operacionais, como iOS, Android, Windows, etc.</div>
      <div className='listatermos'>42. Gerenciamento de Playlists: Possibilidade de criar, editar, organizar e excluir listas de reprodução pessoais.</div >
      <div className='listatermos'>43. Recursos de Busca Avançada: Realizar buscas avançadas por artistas, músicas, vídeos ou conteúdo específico dentro da aplicação.</div>
      <div className='listatermos'>44. Histórico de Reprodução: Acesso ao histórico de músicas, vídeos ou conteúdo reproduzido anteriormente.</div >
      <div className='listatermos'>45. Modo de Reprodução em Tela Cheia: Expandir o vídeo para preencher toda a tela durante a reprodução.</div >
      <div className='listatermos'>46. Modo de Reprodução em Segundo Plano: Permitir a reprodução contínua de áudio enquanto a aplicação é minimizada ou o dispositivo está em uso.</div>
      <div className='listatermos'>47. Recursos de Curadoria: Acesso a playlists, recomendações ou conteúdo selecionado e curado por especialistas ou artistas renomados.</div>
      <div className='listatermos'>48. Controles Parentais: Configurar restrições de conteúdo para controle e segurança quando a aplicação é utilizada por crianças.</div>
      <div className='listatermos'>49. Termos de Renovação de Assinatura: Conhecer os termos de renovação automática da assinatura e as políticas de cobrança.</div >
      <div className='listatermos'>50. Termos de Reembolso e Cancelamento: Entender as políticas de reembolso e cancelamento da aplicação caso haja insatisfação ou necessidade de interromper o serviço.</div>

    </div>
    <Rodape></Rodape>
    </>
   )
}

export default Termos;