import React, { createContext, useEffect, useState } from 'react'
import { Proffy } from '../types'

interface ProffyContextData {
    proffys: Proffy[]
}

const proffyInitialValues: ProffyContextData = {
    proffys: [],
}

export const ProffyContext =
    createContext<ProffyContextData>(proffyInitialValues)

export const ProffyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [proffys, setProffys] = useState<Proffy[]>([])

    useEffect(() => {
        if (proffys.length === 0) {
            getProffys()
        }
    }, [proffys])

    const getProffys = async () => {
        // const response = await fetch('http://localhost:3333/proffys');
        // const data = await response.json();
        const data: Proffy[] = [
            {
                id: 1,
                name: 'Diego Fernandes',
                avatar: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
                whatsapp: '',
                bio: 'Breaking bad do bem',
                subject: 'Química',
                cost: 50,
                schedule: [],
            },
            {
                id: 2,
                name: 'Rodrigo Gonçalves',
                avatar: 'https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg',
                whatsapp: '',
                bio: '',
                subject: 'Biologia',
                cost: 100,
                schedule: [],
            },
            {
                id: 3,
                name: 'Lucas Lima',
                avatar: '',
                whatsapp:
                    'https://www.shutterstock.com/image-photo/close-headshot-portrait-smiling-young-260nw-1916406272.jpg',
                bio: '1+1 náo é 2 é 10',
                subject: 'Matemática',
                cost: 150,
                schedule: [],
            },
        ]
        setProffys(data)
    }

    return (
        <ProffyContext.Provider
            value={{
                proffys,
            }}
        >
            {children}
        </ProffyContext.Provider>
    )
}
