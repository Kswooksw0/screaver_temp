import React, { useState, useEffect, useRef } from "react";
import marmotClose from "../../assets/images/screaming_marmot_close.png"; // Correct path
import marmotOpen from "../../assets/images/screaming_marmot_open.png"; // Correct path
import screamSound from "../../assets/media/screamot_scream.mp4"; // Import the MP4 file
import styles from "./HomePage.module.css";
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/Title";
import { Socials } from "../../components/Socials/Socials";

const HomePage = () => {
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

      // Set the timeout to remove the jiggle class after 500ms
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
    alert(window.innerWidth)
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <img
        src={isMouthOpen ? marmotOpen : marmotClose}
        alt="Screaming Marmot"
        className={styles.image}
      />
      <audio ref={audioRef} src={screamSound} preload="auto" />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.topHalf}>
          <Title />
        </div>
        <div className={styles.bottomHalf}>
          <Socials />
        </div>
      </div>

      {/* Counter section (separate from mainContent) */}
      <div className={styles.counterContainer}>
        <h1 className={styles.count}>{counter}</h1>
      </div>

    </div>
  );
};

export default HomePage;
