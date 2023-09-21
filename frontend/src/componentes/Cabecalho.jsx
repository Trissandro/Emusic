import React from "react";
import './cabeca.css';
import {Link} from "react-router-dom";

function Cabecalho(){
return(
    <>
    
    <div id="area">
            <div id={'menu'}>
                <Link to={'/Home'}>Home</Link>
                <Link to={'/Home'}>Emusic</Link>
                <Link to={'/Perfil'}>Perfil</Link>
    </div>
    </div>
    </>

)
}
export default Cabecalho;