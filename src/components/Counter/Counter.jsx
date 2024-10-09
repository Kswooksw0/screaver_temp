import React, { useState, useEffect, useRef } from "react";
import screamSound from "../../assets/media/screamot_scream.mp4"; // Correct path
import marmotClose from "../../assets/images/screaming_marmot_close.png"; // Correct path
import marmotOpen from "../../assets/images/screaming_marmot_open.png"; // Correct path
import styles from "./Counter.module.css";

export const Counter = () => {
  const [isMouthOpen, setMouthOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [shouldJiggle, setShouldJiggle] = useState(false);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  // Jiggle animation logic
  useEffect(() => {
    let timer;
    if (shouldJiggle) {
      const countElement = document.querySelector(`.${styles.count}`);
      countElement.classList.add(styles.jiggle);

      timer = setTimeout(() => {
        countElement.classList.remove(styles.jiggle);
        setShouldJiggle(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [shouldJiggle]);

  // Handle the click action and audio
  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isMouthOpen) {
      setCounter(counter + 1);
      setShouldJiggle(true);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }

    setMouthOpen(true);

    timeoutRef.current = setTimeout(() => {
      setMouthOpen(false);
    }, 500);
  };

  return (
    <div className={styles.counterContainer} onClick={handleClick}>
      {/* Marmot image */}
      <img
        src={isMouthOpen ? marmotOpen : marmotClose}
        alt="Screaming Marmot"
        className={styles.marmotImage}
      />
      {/* Counter */}
      <h1 className={styles.count}>{counter}</h1>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={screamSound} preload="auto" />
    </div>
  );
};
