import React, { useState, useEffect } from "react";
import './App.css';

const audioData = [
  {
    key: "Q",
    name: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    key: "W",
    name: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    key: "E",
    name: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    key: "A",
    name: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    key: "S",
    name: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    key: "D",
    name: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    key: "Z",
    name: "Kick-n-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    key: "X",
    name: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    key: "C",
    name: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  },

]

function App() {
  const [audioRefs, setAudioRefs] = useState({});
  const [displayText, setDisplayText] = useState("Try it!");

  const handleClick = (key) => {
    playAudio(key);
  }

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const validKeys = audioData.map(item => item.key);
    if (validKeys.includes(key)) {
      playAudio(key);
    }
  };

  const playAudio = (key) => {
    const audioRef = audioRefs[key];
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setDisplayText(audioData.find((item) => item.key === key).name);
    }
  };

  useEffect(() => {
    // Gombnyomásra való reagálás hozzáadása a window-hoz
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup: eltávolítjuk a gombnyomásra való reagálást, ha a komponens unmount-olódik
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    // A komponens inicializálásakor létrehozzuk az audioRefs referenciákat
    const refs = {};
    audioData.forEach(item => {
      refs[item.key] = React.createRef();
    });
    setAudioRefs(refs);
  }, []);

  return (
    <div id="drum-machine">
      <div className="buttons">
        {audioData.map((item) => (
          <div
            className="drum-pad"
            id={`drum-pad-${item.key}`}
            key={item.key}
            onClick={() => handleClick(item.key)}
            onKeyDown={(event) => handleKeyPress(event, item.key)}
            tabIndex="0"
          >
            {item.key}
            <audio
              className="clip"
              id={item.key}
              src={item.src}
              ref={audioRefs[item.key]}
            ></audio>

          </div>
        ))}
      </div>
      <div className="display">

        <div id="display">
          {displayText}
        </div>
      </div>
    </div>
  );
}


export default App;
