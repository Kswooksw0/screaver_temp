import React from "react";
import styles from "./Title.module.css";
import { Logo } from "../Logo/Logo";

export const Title = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.titleContainer}>
      <Logo />
      <h1 className={styles.title}>SCREAMOT</h1>
    </div>
  );
};
