import React from 'react';
import logo from '../../assets/images/screamot_logo.png';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} className={styles.logo} alt="Screamot Logo" />
    </div>
  );
};
