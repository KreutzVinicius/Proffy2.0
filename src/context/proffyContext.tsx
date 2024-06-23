import React, { createContext, useEffect, useState } from 'react'
import { ScheduledClasses, Proffy } from '../types'
import dataService from '../service/dataservice'
interface ProffyContextData {
    proffys: Proffy[]
    classes: ScheduledClasses[]
    isTeacher: boolean
    isLogged: boolean
    loginHandler: (email: string, password: string) => void
    createProffy: (proffy: Proffy) => void
}

const proffyInitialValues: ProffyContextData = {
    proffys: [],
    classes: [],
    isTeacher: false,
    isLogged: false,
    loginHandler: () => {},
    createProffy: () => {},
}

export const ProffyContext =
    createContext<ProffyContextData>(proffyInitialValues)

export const ProffyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<Proffy | null>(null)
    const [proffys, setProffys] = useState<Proffy[]>([])
    const [classes, setClasses] = useState<ScheduledClasses[]>([])
    const [isTeacher, setIsTeacher] = useState<boolean>(false)

    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        if (proffys.length === 0) {
            getProfessors()
        }
    }, [proffys])

    useEffect(() => {
        if (classes.length === 0) {
            getClasses()
        }
    }, [classes])

    const createProffy = async (proffy: Proffy) => {
        const response = await dataService.create('user', proffy)
        console.log(`🚀 ~ createProffy ~ response:`, response)
    }

    const loginHandler = async (email: string, password: string) => {
        const response = await dataService.login(email, password)
        console.log(`🚀 ~ loginHandler ~ response:`, response)
        if (response.status === 200) {
            setIsLogged(response)
            setUser(response.data)
        } else {
            setIsLogged(false)
            console.log('Login failed')
        }
    }

    const getProfessors = async () => {
        const response = await dataService.get('user')
        if (response?.status === 200) {
            const professors = response.data.filter(
                (user: Proffy) => user.type === 'professor'
            )
            setProffys(professors)
        }
    }

    const getClasses = async () => {
        // const response = await fetch('http://localhost:3333/classes');
        // const data = await response.json();
        const data: ScheduledClasses[] = [
            {
                id: 1,
                subject: 'Química',
                teacherName: 'Beatriz Santos',
                date: '14/06/2024 16:30',
                cost: 50,
                teacherId: 0,
                studentId: 0,
                studentName: 'Maicon Douglas',
            },
            {
                id: 2,
                subject: 'Biologia',
                teacherName: 'Lucas Mendes',
                date: '15/06/2024 16:00',
                cost: 50,
                teacherId: 0,
                studentId: 0,
                studentName: 'João Pedro',
            },
            {
                id: 3,
                subject: 'Matemática',
                teacherName: 'Rafael Oliveira',
                date: '14/06/2024 16:00',
                cost: 50,
                teacherId: 0,
                studentId: 0,
                studentName: 'Will Smith',
            },
        ]
        setClasses(data)
    }

    return (
        <ProffyContext.Provider
            value={{
                proffys,
                classes,
                isTeacher,
                isLogged,
                loginHandler,
                createProffy,
            }}
        >
            {children}
        </ProffyContext.Provider>
    )
}
