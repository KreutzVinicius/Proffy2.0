import React, { createContext, useState } from 'react';

interface ProffyContextData {}

export const ProffyContext = createContext<ProffyContextData | undefined>(undefined);

export const ProffyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  


    return (
        <ProffyContext.Provider
            value={{
            }}
        >
            {children}
        </ProffyContext.Provider>
    );
};