import React from "react";
import xIcon from "../../assets/icons/x_icon.png"; // Correct path
import telegramIcon from "../../assets/icons/telegram.png"; // Correct path
import suiscanLogo from "../../assets/images/solscan_logo.png"; // Correct path
import styles from "./Socials.module.css";

export const Socials = () => {
  // Example smart contract address
  const contractAddress = "CA: 7GCihgDB8fe6KNjn2MYtkzZcRJQy3t9GHdC8uHYmW2hr";

  return (
    <div className={styles.socialsContainer}>
      {/* Smart contract address container for larger screens */}
      <div className={styles.contractAddressContainer}>
        <img src={suiscanLogo} className={styles.solscanLogo} alt="Suiscan Logo" />
        <span className={styles.contractAddress}>
          {contractAddress}
        </span>
      </div>

      {/* Icons for socials */}
      <div className={styles.iconsContainer}>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <img src={xIcon} alt="X" className={styles.icon} />
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
          <img src={telegramIcon} alt="Telegram" className={styles.icon} />
        </a>
      </div>
    </div>
  );
};
