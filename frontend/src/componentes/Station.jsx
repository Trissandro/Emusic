import React from "react";
import "./station.css";
import { FaPause, FaPlay } from "react-icons/fa";

const Station = (station) => {
  const audioPlayerRef = React.useRef(null);

  React.useEffect(() => {
    if (station.isPlaying) {
      audioPlayerRef.current.play();
    } else {
      audioPlayerRef.current.pause();
    }
  }, [station.isPlaying]);

  return (

    <div className="song_container radio-container">
      <div className="left">
        <p onClick={station.onClick} className="play_btn">
          {station.isPlaying ? <FaPause /> :<FaPlay /> }
        </p>
      </div>
      <div className="right">
        <p>{station.station.name}</p>
      </div>
      <audio
        ref={audioPlayerRef}
        src={station.station.urlResolved}
        style={{ display: "none" }}
      ></audio>
    </div>
  );
};

export default Station;
