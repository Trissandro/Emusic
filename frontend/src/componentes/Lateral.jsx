import React from "react";
import './cabeca.css';
import {Link} from "react-router-dom";

function Lateral(){
return(
    <>
    
    <div id="area">
            <div id={'menu'}>
                <Link to={'/Home'}></Link>
                <Link to={'/Home'}>Emusic</Link>
                <Link to={'/Perfil'}>Perfil</Link>
    </div>
    </div>
      <div className="container">
        <div className="left-content">
          <div className="top-content">
            
          </div>
  
          <div className="divider-gray1"></div>
  
          <div className="bottom-content2">
          
         
          </div>
        </div>  
        <div className="right-content">
          <div className="cont">
           
          </div>
        </div>
      </div>
    </>

)
}
export default Lateral;