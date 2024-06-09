import React, { createContext, useEffect, useState } from 'react';
import { Proffy } from '../types';

interface ProffyContextData {
    proffys: Proffy[];
}

const proffyInitialValues: ProffyContextData = {
    proffys: [],
};

export const ProffyContext = createContext<ProffyContextData>(proffyInitialValues);

export const ProffyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [proffys, setProffys] = useState<Proffy[]>([]);


    useEffect(() => {
        if(proffys.length === 0) {
            getProffys()
        }
    }, [proffys]);


    const getProffys = async () => {
        const response = await fetch('http://localhost:3333/proffys');
        const data = await response.json();
        setProffys(data);
    }

    return (
        <ProffyContext.Provider
            value={{
                proffys,
            }}
        >
            {children}
        </ProffyContext.Provider>
    );
};