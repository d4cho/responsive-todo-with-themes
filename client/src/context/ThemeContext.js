import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// create context
const ThemeContext = createContext();

// export context hook
export function useThemeContext() {
  return useContext(ThemeContext);
}

// provider component
export function ThemeProvider({ children }) {
  // state
  const [darkTheme, setDarkTheme] = useState(true);
  const [themeId, setThemeId] = useState('');

  useEffect(() => {
    getTheme();
  }, []);

  async function getTheme() {
    try {
      const response = await axios.get('/api/themes');

      setDarkTheme(response.data.data[0].isDark);
      setThemeId(response.data.data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  // actions
  const toggleTheme = async (isDark) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const response = await axios.post(
        '/api/themes',
        { id: themeId, isDark },
        config
      );

      setDarkTheme(response.data.data.isDark);
      setThemeId(response.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
