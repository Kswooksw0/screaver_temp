import React from "react";
import { Title } from "../../components/Title/Title";
import { Socials } from "../../components/Socials/Socials";
import { Tokenomics } from "../../components/Tokenomics/Tokenomics";
import styles from "./AboutScream.module.css";

const AboutScream = () => {
  return (
    <div className={styles.aboutScreamContainer}>
      <Title />
      <Socials />
      <div className={styles.descContainer}>
        <div className={styles.desc}>
          {/* description of the meme */}
          The Screaming Marmot meme originates from a 2015 video posted by
          Instagram user @lonegoatsoap, capturing a marmot making a high-pitched
          noise at Blackcomb Mountain, Whistler, British Columbia. The video
          went viral after being dubbed with a human-like scream, turning it
          into a symbol of exaggerated emotional expression. Over time, it
          went viral across platforms like YouTube and Vine, often used humorously
          to represent absurd or cathartic reactions to everyday situations.
        </div>
      </div>
      <Tokenomics />
      {/* insert Meme Gallery */}
    </div>
  );
};

export default AboutScream;
