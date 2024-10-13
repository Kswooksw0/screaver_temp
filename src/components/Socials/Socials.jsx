import React from "react";
import xIcon from "../../assets/icons/x_icon.png"; // Correct path
import telegramIcon from "../../assets/icons/telegram.png"; // Correct path

import styles from "./Socials.module.css";
import { ContractAddress } from "../ContractAddress/ContractAddress";

export const Socials = ({ navigateToAboutPage }) => {
  // Example smart contract address
  const contractAddress = "CA: 7GCihgDB8fe6KNjn2MYtkzZcRJQy3t9GHdC8uHYmW2hr";

  const handleSocialsClick = (event) => {
    event.stopPropagation();
    // navigateToAboutPage();
    // alert('hello world')
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
