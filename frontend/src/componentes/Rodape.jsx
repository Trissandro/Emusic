import React from 'react';
import Servicos from './Servicos';
import Sobre from './Sobre';
import Termos from './Termos';
import Ajuda from './Ajuda';
import Contactos from './Contactos';
import Aplicacaomobile from './Aplicacaomobile';
import { Link } from 'react-router-dom';
import './Rodape.css';


const Rodape = () => {
  return (
    <footer>
      <div className="footer-top">
        <Link to="/Contactos" element={<Contactos/>}>Contactos</Link>
        <Link to="/Ajuda" element={<Ajuda/>}>Ajuda</Link>
        <Link to="/Termos" element={<Termos/>}>Termos</Link>
      </div>
      <div className="footer-bottom">
        <Link to="/Sobre" element={<Sobre/>} >Sobre nós</Link>
        <Link to="/Servicos" element={<Servicos/>}>Serviços</Link>
        <Link to="/aplicacaomobile" element={<Aplicacaomobile/>}>Aplicação Mobile</Link>
      </div>
    </footer>
  );
}

export default Rodape;

