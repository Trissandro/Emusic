import { RadioBrowserApi } from 'radio-browser-api'

const api = new RadioBrowserApi('My Radio App')

// query stations by country code and limit to first 100 stations
const stations = await api.searchStations({
  countryCode: 'US',
  limit: 100,
  offset: 0 // this is the default - can be omited
})
// get next 100 stations
const stations = await api.searchStations({
  countryCode: 'US',
  limit: 100,
  offset: 1 // 1 - is the second page
})

import { RadioBrowserApi } from "radio-browser-api";
import React from "react";
import Station from "../../components/Station";
import styles from "./styles.module.css";
const api = new RadioBrowserApi("Radio");

const Radio = () => {
  const [search, setSearch] = React.useState("Angola");
  const [results, setResults] = React.useState({});
  const [isFetching, setIsFetching] = React.useState(false);
  const [playingRadio, setPlayingRadio] = React.useState(-1);

  const fetchRadio = async () => {
    setResults({});
    try {
      setIsFetching(true);
      const data = await api.searchStations({
        country: search === "" ? "Angola" : search,
        limit: 100,
      });
      setResults(data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  React.useEffect(() => {
    fetchRadio();
  }, [search]);

  return (
    <div className={styles.container}>
    
      {isFetching && (
        <div className={styles.progress_container}>
          <Loading />
        </div>
      )}
      {Object.keys(results).length !== 0 && (
        <div className={styles.results_container}>
          {results.length !== 0 && (
            <div className={styles.songs_container}>
              {results.map((station, index) => (
                <Station
                  key={station.id}
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Radio;