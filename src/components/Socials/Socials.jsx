// import React from "react";
import xIcon from "../../assets/icons/x_icon.png"; // Correct path
import telegramIcon from "../../assets/icons/telegram.png"; // Correct path
import styles from "./Socials.module.css";

export const Socials = ({ navigateToAboutPage }) => {

  const handleSocialsClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className={styles.iconsContainer} onClick={handleSocialsClick}>
        <button className={styles.aboutButton} onClick={navigateToAboutPage}>
          About $SCREAM
        </button>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <img src={xIcon} alt="X" className={styles.icon} />
        </a>
        <a
          href="https://telegram.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={telegramIcon} alt="Telegram" className={styles.icon} />
        </a>
      </div>
    </>
  );
};
