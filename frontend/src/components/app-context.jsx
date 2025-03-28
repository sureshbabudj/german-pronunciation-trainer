import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [isSplashVisible, setSplashVisible] = useState(false);
  return (
    <AppContext.Provider value={{ isSplashVisible, setSplashVisible }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
