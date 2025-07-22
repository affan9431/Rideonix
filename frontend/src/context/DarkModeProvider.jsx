import React from "react";

export const DarkModeContext = React.createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
