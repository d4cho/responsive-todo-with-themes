import React from 'react';

import styles from './Header.module.css';
import { useThemeContext } from '../context/ThemeContext';
import { ReactComponent as DarkThemeSVG } from '../assets/images/icon-sun.svg';
import { ReactComponent as LightThemeSVG } from '../assets/images/icon-moon.svg';

const Header = () => {
  const { darkTheme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.container}>
      <h1>TODO</h1>
      <span className={styles.svg} onClick={() => toggleTheme(!darkTheme)}>
        {darkTheme ? <DarkThemeSVG /> : <LightThemeSVG />}
      </span>
    </div>
  );
};

export default Header;
