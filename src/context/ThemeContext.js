import React, { createContext, useContext, useState } from 'react';

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

  // actions
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
