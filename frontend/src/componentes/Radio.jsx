import { RadioBrowserApi } from 'radio-browser-api';
import Station from './Station';
import styles from './RadioPage.module.css';
import React, { useEffect, useState } from 'react';
import { FaHome, FaMicrophone, FaMusic, FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

const api = new RadioBrowserApi('Emusic');

const Radio = () => {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingRadio, setPlayingRadio] = useState(-1);

  useEffect(() => {
    fetchStations();
  }, []);

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const response = await api.searchStations({
        countryCode: 'AO',
        limit: 100,
        offset: stations.length,
      });
      setStations([...stations, ...response]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching more stations:', error);
      setIsLoading(false);
    }
  };

  const fetchStations = async () => {
    try {
      setIsLoading(true);
      const response = await api.searchStations({
        countryCode: 'AO',
        limit: 100,
        offset: 0,
      });
      setStations(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching stations:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
         <Cabecalho></Cabecalho>
    <div className="container1">
    <div className="lado-esquerdo">
    <div>
      <Link to={'/Home'}><FaHome>
      </FaHome>     Home</Link>
      </div>
      <div className='radiobotao'>
        <Link to={'/Radio'}><FaMicrophone></FaMicrophone>     Rádio</Link>
      </div>
      <div>
      <Link to={'/Musica'}><FaMusic>
      </FaMusic>     Músicas</Link>
      </div>
      <div>
      <Link to={'/Video'}><FaVideo>
      </FaVideo>     Vídeo</Link>
      </div>
    </div>

    <div className="barra" />

    <div className="lado-direito">
    <div className={styles.container}>
      <div className={styles.stationList}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {stations.map((station, index) => (
              <Station 
                key={station.stationuuid} // Adicionando a chave única usando stationuuid
                station={station}
                onClick={() => {
                  if (index === playingRadio) {
                    setPlayingRadio(-1);
                  } else {
                    setPlayingRadio(index);
                  }
                }}
                isPlaying={index === playingRadio}
              />
            ))}
            {stations.length > 0 && (
              <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
    </div>
  </div>
 
   <Rodape></Rodape>
  </>
  );
};

export default Radio;
