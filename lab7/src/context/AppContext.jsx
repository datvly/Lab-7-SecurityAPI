import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [name, setName] = useState("Dat");

    const updateName = (newName) => {
        setName(`${newName}`);
    };

    return (
        <AppContext.Provider value={{ name, updateName }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);